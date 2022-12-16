const getSubCategoryModel = (sequelize, { DataTypes }) => {
  const SubCategory = sequelize.define('SubCategory', {
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(127),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  SubCategory.associate = (models) => {
    SubCategory.belongsTo(models.Category, { foreignKey: 'categoryId' });
    SubCategory.hasMany(models.SoundRecord, {
      foreignKey: 'subCategoryId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return SubCategory;
};

export default getSubCategoryModel;
