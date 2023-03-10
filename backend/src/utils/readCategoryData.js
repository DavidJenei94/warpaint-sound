import fs from 'fs';
import config from '../configs/general.config.js';

const readCategoryData = () => {
  const categories = [];
  const subCategories = [];

  const categoriesJSON = fs.readFileSync(
    config.mainPath + '/src/data/instrument-categories.json'
  );
  const categoriesObject = JSON.parse(categoriesJSON);

  categoriesObject.categories.forEach((category) => {
    const catId = category.id;
    categories.push({ id: catId, name: category.name });

    category.subCategories.forEach((subCategory) => {
      subCategory.categoryId = catId;
      subCategories.push({
        id: subCategory.id,
        categoryId: catId,
        name: subCategory.name,
      });
    });
  });

  return { categories: categories, subCategories: subCategories };
};

export default readCategoryData;
