const getCategoryModel = (sequelize, { DataTypes }) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING(127),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.SubCategory, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Category;
};

export default getCategoryModel;
