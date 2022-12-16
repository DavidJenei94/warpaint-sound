import db from '../models/index.js';

const Category = db.models.Category;
const SubCategory = db.models.SubCategory;

const getAll = async () => {
  const dbCategories = await Category.findAll({ order: [['name', 'ASC']] });
  const dbSubCategories = await SubCategory.findAll({
    order: [['name', 'ASC']],
  });

  return {
    categories: dbCategories,
    subCategories: dbSubCategories,
  };
};

export default { getAll };
