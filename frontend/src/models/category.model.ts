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
