import fs from 'fs';
import db from '../models/index.js';

import HttpError from '../utils/HttpError.js';

const SoundRecord = db.models.SoundRecord;

const getAll = async () => {
  const dbSoundRecords = await SoundRecord.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  // empty
  if (!dbSoundRecords) {
    return [];
  }

  // one element
  if (!Array.isArray(dbSoundRecords)) {
    return [dbSoundRecords];
  }

  // otherwise
  return dbSoundRecords;
};

const create = async (soundRecord, files) => {
  console.log(soundRecord);
  if (
    !soundRecord.instrument ||
    !soundRecord.category ||
    !soundRecord.subCategory ||
    !soundRecord.description ||
    !soundRecord.latitude ||
    !soundRecord.longitude ||
    !files.imageFile ||
    !files.soundFile
  ) {
    throw new HttpError('Some data missing from request.', 400);
  }

  const dbSoundRecord = await SoundRecord.create({
    instrument: soundRecord.instrument,
    category: soundRecord.category,
    subCategory: soundRecord.subCategory,
    description: soundRecord.description,
    latitude: soundRecord.latitude,
    longitude: soundRecord.longitude,
    imagePath: files.imageFile[0].path,
    soundPath: files.soundFile[0].path,
  });

  if (!dbSoundRecord) {
    throw new HttpError('Error in creating new SoundRecord.', 400);
  }

  delete dbSoundRecord.createdAt;
  delete dbSoundRecord.updatedAt;

  return {
    message: 'New SoundRecord is created!',
    soundRecord: dbSoundRecord,
  };
};

const get = async (soundRecordId) => {
  const dbSoundRecord = await SoundRecord.findByPk(soundRecordId, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  if (!dbSoundRecord) {
    throw new HttpError('SoundRecord does not exist in the database.', 400);
  }

  // const geoJson = JSON.parse(fs.readFileSync(dbRoute.path, 'utf-8'));

  return {
    message: 'SoundRecord is selected!',
    soundRecord: dbSoundRecord,
    // geoJson,
  };
};

const update = async (soundRecord) => {
  if (soundRecord) {
    const dbSoundRecord = await SoundRecord.update(
      {
        instrument: soundRecord.instrument,
        category: soundRecord.category,
        subCategory: soundRecord.subCategory,
        description: soundRecord.description,
        latitude: soundRecord.coordinates[0],
        longitude: soundRecord.coordinates[1],
        imagePath: soundRecord.imageUrl,
        soundPath: soundRecord.soundUrl,
      },
      { where: { id: soundRecord.id } }
    );

    if (!dbSoundRecord || dbSoundRecord[0] === 0) {
      throw new HttpError('Error in updating SoundRecord.', 400);
    }
  }

  // if (route && geoJson && geoJson.features.length !== 0) {
  //   const geoJsonString = JSON.stringify(geoJson);
  //   const path = route.path;

  //   fs.writeFile(path, geoJsonString, (error) => {
  //     if (error) {
  //       throw new HttpError('Error in updating route.', 400);
  //     }
  //   });
  // }

  return { message: 'SoundRecord is updated!' };
};

const remove = async (soundRecordId) => {
  // delete file
  // fs.unlink(routePath, (error) => {
  //   if (error)
  //     throw new HttpError('Route does not exist or cannot be deleted.', 400);
  // });

  const dbSoundRecord = await SoundRecord.destroy({
    where: { id: soundRecordId },
  });

  if (!dbSoundRecord) {
    throw new HttpError(
      'SoundRecord does not exist or cannot be deleted.',
      400
    );
  }

  return { message: 'SoundRecord deleted.' };
};

export default {
  getAll,
  create,
  get,
  update,
  remove,
};
