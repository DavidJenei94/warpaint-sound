const getCountryModel = (sequelize, { DataTypes }) => {
  const Country = sequelize.define('Country', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING(2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING(127),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Country.associate = (models) => {
    Country.hasMany(models.SoundRecord, {
      foreignKey: 'countryId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Country;
};

export default getCountryModel;
