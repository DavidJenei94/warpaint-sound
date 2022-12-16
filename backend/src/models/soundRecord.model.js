const getSoundRecordModel = (sequelize, { DataTypes }) => {
  const SoundRecord = sequelize.define('SoundRecord', {
    instrument: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    subCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    soundPath: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    countryId: {
      type: DataTypes.STRING(2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    level: {
      type: DataTypes.STRING,
      defaultValue: 'basic',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  SoundRecord.associate = (models) => {
    SoundRecord.belongsTo(models.SubCategory, { foreignKey: 'subCategoryId' });
    SoundRecord.belongsTo(models.Country, { foreignKey: 'countryId' });
  };

  return SoundRecord;
};

export default getSoundRecordModel;
