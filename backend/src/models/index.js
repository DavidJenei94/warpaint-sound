import Sequelize from 'sequelize';

import db from '../configs/db.config.js';

import getSoundRecordModel from './soundRecord.model.js';
import getCategoryModel from './category.model.js';
import getSubCategoryModel from './subcategory.model.js';
import getCountryModel from './country.model.js';

const sequelize = new Sequelize(db.name, db.user, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect,
  logging: false,
});

const models = {
  SoundRecord: getSoundRecordModel(sequelize, Sequelize),
  Category: getCategoryModel(sequelize, Sequelize),
  SubCategory: getSubCategoryModel(sequelize, Sequelize),
  Country: getCountryModel(sequelize, Sequelize),
};

// Associate models to each others
Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export default {
  models,
  sequelize,
};
