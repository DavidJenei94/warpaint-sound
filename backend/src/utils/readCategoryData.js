import fs from 'fs';

const readCategoryData = (directory) => {
  const categories = [];
  const subCategories = [];

  const categoriesJSON = fs.readFileSync(
    directory + '/src/data/instrument-categories.json'
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
