import sequelize, { Op } from 'sequelize';

import db from '../models/index.js';

const SoundRecord = db.models.SoundRecord;
const Category = db.models.Category;
const SubCategory = db.models.SubCategory;
const SoundRecordPlayLog = db.models.SoundRecordPlayLog;

const getCategoryStats = async () => {
  const dbSubCategoryCountStats = await SubCategory.findAll({
    attributes: [
      'id',
      'name',
      [sequelize.fn('COUNT', sequelize.col('*')), 'subCategoryCount'],
    ],
    include: [
      {
        model: SoundRecord,
        required: true,
        attributes: [],
      },
      {
        model: Category,
        required: true,
        attributes: ['id', 'name'],
      },
    ],

    group: ['SubCategory.id', 'Category.id'],
    order: [['id', 'ASC']],
  });

  let subCategoryCountStats;
  if (!dbSubCategoryCountStats) {
    // empty
    subCategoryCountStats = [];
  } else if (!Array.isArray(dbSubCategoryCountStats)) {
    // one element
    subCategoryCountStats = [dbSubCategoryCountStats];
  } else {
    subCategoryCountStats = dbSubCategoryCountStats.map((subCategoryStats) => {
      const stats = JSON.parse(JSON.stringify(subCategoryStats));

      stats.subCategoryCount = Number(stats.subCategoryCount);
      stats.categoryId = stats.Category.id;
      stats.category = stats.Category.name;
      delete stats.Category;

      return stats;
    });
  }

  const dbCategoryCountStats = await Category.findAll({
    attributes: [
      'id',
      'name',
      [sequelize.fn('COUNT', sequelize.col('*')), 'categoryCount'],
    ],
    include: [
      {
        model: SubCategory,
        required: true,
        attributes: [],
        include: [
          {
            model: SoundRecord,
            required: true,
            attributes: [],
          },
        ],
      },
    ],
    group: ['Category.id'],
    order: [['id', 'ASC']],
  });

  let categoryCountStats;
  if (!dbCategoryCountStats) {
    // empty
    categoryCountStats = [];
  } else if (!Array.isArray(dbCategoryCountStats)) {
    // one element
    categoryCountStats = [dbCategoryCountStats];
  } else {
    categoryCountStats = dbCategoryCountStats;
  }

  return {
    subCategoryCountStats: subCategoryCountStats,
    categoryCountStats: categoryCountStats,
  };
};

const getPlayCounts = async () => {
  const dbPlayLogs = await SoundRecordPlayLog.findAll({
    order: [['playCount', 'DESC']],
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  // empty
  if (!dbPlayLogs) {
    return [];
  }

  // one element
  if (!Array.isArray(dbPlayLogs)) {
    return [dbPlayLogs];
  }

  // otherwise
  return dbPlayLogs;
};

const incrementPlayCount = async (soundRecordId) => {
  if (!soundRecordId) {
    throw new HttpError('Some data missing from request.', 400);
  }

  const actualDate = new Date();
  const year = actualDate.getFullYear().toString();
  const month = (actualDate.getMonth() + 1).toString();

  const dbPlayLog = await SoundRecordPlayLog.findOne({
    where: { id: soundRecordId, year: year, month: month },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  if (!dbPlayLog) {
    const dbNewPlayLog = await SoundRecordPlayLog.create({
      id: soundRecordId,
      year: year,
      month: month,
      playCount: 1,
    });

    if (!dbNewPlayLog) {
      throw new HttpError('Error in creating new SoundRecord Play Log.', 400);
    }
  } else {
    const dbUpdatePlayLog = await SoundRecordPlayLog.increment('playCount', {
      by: 1,
      where: { id: soundRecordId, year: year, month: month },
    });

    if (!dbUpdatePlayLog) {
      throw new HttpError('Error in updating SoundRecord Play Log.', 400);
    }
  }

  return {
    message: 'SoundRecord Play Log is updated!',
    soundRecordId: soundRecordId,
  };
};

export default {
  getCategoryStats,
  getPlayCounts,
  incrementPlayCount,
};
