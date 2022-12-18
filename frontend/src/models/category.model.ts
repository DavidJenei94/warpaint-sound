export interface Category {
  id: number;
  name: string;
}

export interface SubCategory {
  id: number;
  categoryId: number;
  name: string;
}

export interface Categories {
  categories: Category[];
  subCategories: SubCategory[];
}

export interface SubCategoryCount {
  id: number;
  name: string;
  categoryId: number;
  category: string;
  subCategoryCount: number;
}

export interface CategoryCount {
  id: number;
  name: string;
  categoryCount: number;
}

export interface CategoriesCountStats {
  subCategoryCountStats: SubCategoryCount[];
  categoryCountStats: CategoryCount[];
}
