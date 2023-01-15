const getSoundRecordPlayLogModel = (sequelize, { DataTypes }) => {
  const SoundRecordPlayLog = sequelize.define(
    'SoundRecordPlayLog',
    {
      playCount: {
        type: DataTypes.BIGINT,
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
