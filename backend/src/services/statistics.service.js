import sequelize, { Op } from 'sequelize';

import db from '../models/index.js';

const SoundRecord = db.models.SoundRecord;
const Category = db.models.Category;
const SubCategory = db.models.SubCategory;

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

export default { getCategoryStats };
