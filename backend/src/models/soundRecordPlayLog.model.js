const getSoundRecordPlayLogModel = (sequelize, { DataTypes }) => {
  const SoundRecordPlayLog = sequelize.define(
    'SoundRecordPlayLog',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      year: {
        type: DataTypes.STRING(4),
        primaryKey: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      month: {
        type: DataTypes.STRING(2),
        primaryKey: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      playCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      timestamps: false,
    }
  );

  SoundRecordPlayLog.associate = (models) => {
    SoundRecordPlayLog.belongsTo(models.SoundRecord, {
      foreignKey: 'id',
    });
  };

  return SoundRecordPlayLog;
};

export default getSoundRecordPlayLogModel;
