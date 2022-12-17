import fs from 'fs';
import sequelize, { Op } from 'sequelize';
import fetch from 'node-fetch';

import db from '../models/index.js';

import HttpError from '../utils/HttpError.js';

const SoundRecord = db.models.SoundRecord;
const Category = db.models.Category;
const SubCategory = db.models.SubCategory;
const Country = db.models.Country;

const getAll = async (searchText) => {
  let dbSoundRecords;
  // dbSoundRecords = await SoundRecord.findAll({
  //   include: [
  //     {
  //       model: SubCategory,
  //       required: true,
  //       attributes: ['name'],
  //       include: [
  //         {
  //           model: Category,
  //           required: true,
  //           attributes: ['id', 'name'],
  //         },
  //       ],
  //     },
  //   ],
  //   attributes: { exclude: ['createdAt', 'updatedAt'] },
  // });

  // console.log(dbSoundRecords);

  dbSoundRecords = await SoundRecord.findAll({
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

  const response = await fetch(
    `http://api.geonames.org/countryCode?lat=${soundRecord.latitude}&lng=${
      soundRecord.longitude
    }&username=${'warpaintvision'}`
  );
  const countryCode = await response.text();

  const dbSoundRecord = await SoundRecord.create({
    instrument: soundRecord.instrument,
    subCategoryId: soundRecord.subCategoryId,
    countryId: countryCode.trim(),
    description: soundRecord.description,
    latitude: soundRecord.latitude,
    longitude: soundRecord.longitude,
    imagePath: files.imageFile[0].path,
    soundPath: files.soundFile[0].path,
  });

  if (!dbSoundRecord) {
    throw new HttpError('Error in creating new SoundRecord.', 400);
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
  // if (soundRecord) {
  //   const dbSoundRecord = await SoundRecord.update(
  //     {
  //       instrument: soundRecord.instrument,
  //       category: soundRecord.category,
  //       subCategory: soundRecord.subCategory,
  //       description: soundRecord.description,
  //       latitude: soundRecord.coordinates[0],
  //       longitude: soundRecord.coordinates[1],
  //       imagePath: soundRecord.imageUrl,
  //       soundPath: soundRecord.soundUrl,
  //     },
  //     { where: { id: soundRecord.id } }
  //   );

  //   if (!dbSoundRecord || dbSoundRecord[0] === 0) {
  //     throw new HttpError('Error in updating SoundRecord.', 400);
  //   }
  // }

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
  // // delete files
  // // fs.unlink(routePath, (error) => {
  // //   if (error)
  // //     throw new HttpError('Route does not exist or cannot be deleted.', 400);
  // // });
  // const dbSoundRecord = await SoundRecord.destroy({
  //   where: { id: soundRecordId },
  // });
  // if (!dbSoundRecord) {
  //   throw new HttpError(
  //     'SoundRecord does not exist or cannot be deleted.',
  //     400
  //   );
  // }
  // return { message: 'SoundRecord deleted.' };
};

export default {
  getAll,
  create,
  get,
  update,
  remove,
};
