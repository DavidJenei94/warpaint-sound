import Sequelize from 'sequelize';

import db from '../configs/db.config.js';

import getSoundRecordModel from './soundRecord.model.js';

const sequelize = new Sequelize(db.name, db.user, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect,
  logging: false,
});

const models = {
  SoundRecord: getSoundRecordModel(sequelize, Sequelize),
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
