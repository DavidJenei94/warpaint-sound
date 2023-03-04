import fetch from 'node-fetch';

import db from '../models/index.js';
import config from '../configs/general.config.js';
import HttpError from '../utils/HttpError.js';
import removeSoundRecordUploads from '../utils/removeUploads.js';
import { transporter, reportingMailOptions } from '../configs/email.config.js';
import { uploadFile, deleteFile } from './aws.service.js';
import { convertAudio } from '../utils/convertAudio.js';

const SoundRecord = db.models.SoundRecord;

const getAll = async () => {
  const dbSoundRecords = await SoundRecord.findAll({
    include: { all: true, nested: true },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  // empty
  if (!dbSoundRecords) {
    return [];
  }

  // one element
  if (!Array.isArray(dbSoundRecords)) {
    return editSoundRecords([dbSoundRecords]);
  }

  // otherwise
  return editSoundRecords(dbSoundRecords);
};

const editSoundRecords = (soundRecords) => {
  return soundRecords.map((soundRecord) => {
    const record = JSON.parse(JSON.stringify(soundRecord));

    record.country = record.Country.name;
    record.categoryId = record.SubCategory.Category.id;
    record.category = record.SubCategory.Category.name;
    record.subCategory = record.SubCategory.name;
    delete record.Country;
    delete record.Category;
    delete record.SubCategory;
    delete record.SoundRecordPlayLog;

    return record;
  });
};

const create = async (soundRecord, files) => {
  if (
    !soundRecord.instrument ||
    !soundRecord.latitude ||
    !soundRecord.longitude ||
    !files.imageFile ||
    !files.soundFile
  ) {
    throw new HttpError('Some data missing from request.', 400);
  }

  let countryCode;
  try {
    const response = await fetch(
      `http://api.geonames.org/countryCode?lat=${soundRecord.latitude}&lng=${
        soundRecord.longitude
      }&username=${'warpaintvision'}`
    );
    countryCode = await response.text();
  } catch (error) {
    countryCode = '00';
  }

  try {
    await convertAudio(files.soundFile[0].path);
  } catch (error) {
    throw new HttpError(error, 400);
  }

  // remove upload/ from path
  const imagePath = files.imageFile[0].path.substring(8);
  const soundPath = files.soundFile[0].path.substring(8);

  const dbSoundRecord = await SoundRecord.create({
    instrument: soundRecord.instrument,
    subCategoryId: soundRecord.subCategoryId,
    countryId: countryCode.trim(),
    description: soundRecord.description,
    latitude: soundRecord.latitude,
    longitude: soundRecord.longitude,
    imagePath: imagePath,
    soundPath: soundPath,
  });

  if (!dbSoundRecord) {
    throw new HttpError('Error in creating new SoundRecord.', 400);
  }

  // In production upload file to S3 bucket (it also deletes the file from /uploads)
  if (config.environment === 'production') {
    await uploadFile(files.imageFile[0]);
    await uploadFile(files.soundFile[0]);
  }

  const newDbSoundRecord = await SoundRecord.findByPk(dbSoundRecord.id, {
    include: { all: true, nested: true },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  return {
    message: 'New SoundRecord is created!',
    soundRecord: editSoundRecords([newDbSoundRecord])[0],
  };
};

const get = async (soundRecordId) => {
  const dbSoundRecord = await SoundRecord.findByPk(soundRecordId, {
    include: { all: true, nested: true },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  if (!dbSoundRecord) {
    throw new HttpError('SoundRecord does not exist in the database.', 400);
  }

  return {
    message: 'SoundRecord is selected!',
    soundRecord: editSoundRecords([dbSoundRecord])[0],
  };
};

const update = async (soundRecord) => {
  if (soundRecord) {
    let countryCode;
    try {
      const response = await fetch(
        `http://api.geonames.org/countryCode?lat=${soundRecord.latitude}&lng=${
          soundRecord.longitude
        }&username=${'warpaintvision'}`
      );
      countryCode = await response.text();
    } catch (error) {
      countryCode = '00';
    }

    const dbSoundRecord = await SoundRecord.update(
      {
        instrument: soundRecord.instrument,
        subCategoryId: soundRecord.subCategoryId,
        description: soundRecord.description,
        countryId: countryCode.trim(),
        latitude: soundRecord.latitude,
        longitude: soundRecord.longitude,
        imagePath: soundRecord.imagePath,
        soundPath: soundRecord.soundPath,
        level: soundRecord.level,
      },
      { where: { id: soundRecord.id } }
    );

    if (!dbSoundRecord || dbSoundRecord[0] === 0) {
      throw new HttpError('Error in updating SoundRecord.', 400);
    }
  }

  return { message: 'SoundRecord is updated!' };
};

const remove = async (soundRecordId) => {
  const dbSoundRecord = await SoundRecord.findByPk(soundRecordId, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  if (!dbSoundRecord) {
    throw new HttpError('SoundRecord does not exist in the database.', 400);
  }

  // In production delete file to S3 bucket
  if (config.environment === 'production') {
    await deleteFile(dbSoundRecord.imagePath);
    await deleteFile(dbSoundRecord.soundPath);
  } else if (config.environment === 'development') {
    // in dev delete files from /uploads
    removeSoundRecordUploads(
      `uploads/${dbSoundRecord.imagePath}`,
      `uploads/${dbSoundRecord.soundPath}`
    );
  }

  //remove from DB
  const dbDeletedSoundRecord = await SoundRecord.destroy({
    where: { id: soundRecordId },
  });
  if (!dbDeletedSoundRecord) {
    throw new HttpError(
      'SoundRecord does not exist or cannot be deleted.',
      400
    );
  }
  return { message: 'SoundRecord deleted.' };
};

const report = async (soundRecordId, reportMessage) => {
  const emailText = `Sound Record: ${soundRecordId}\nMessage: ${reportMessage}`;

  try {
    // When sendMail has no callback as parameter, it returns a promise.
    await transporter.sendMail(reportingMailOptions(emailText));
  } catch (error) {
    throw new HttpError(
      'Error while Sending SoundRecord Report via email.',
      500
    );
  }

  return { message: 'Sound Record reported.' };
};

export default {
  getAll,
  create,
  get,
  update,
  remove,
  report,
};
