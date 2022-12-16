export interface SoundRecord {
  id: number;
  instrument: string;
  categoryId: number;
  category: string;
  subCategoryId: number;
  subCategory: string;
  description: string;
  latitude: number;
  longitude: number;
  imagePath: string;
  soundPath: string;
}

export const defaultSoundRecord = {
  id: 0,
  instrument: '',
  categoryId: 0,
  category: '',
  subCategoryId: 0,
  subCategory: '',
  description: '',
  latitude: 0,
  longitude: 0,
  imagePath: '',
  soundPath: '',
};

export interface SoundRecordFilter {
  name: string;
  categoryId: number;
  subCategoryId: number;
}

export const defaultSoundRecordFilter = {
  name: '',
  categoryId: 0,
  subCategoryId: 0,
};
