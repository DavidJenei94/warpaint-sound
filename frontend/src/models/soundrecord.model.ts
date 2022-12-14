export interface SoundRecord {
  id: number;
  instrument: string;
  category: string;
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
  category: '',
  subCategory: '',
  description: '',
  latitude: 0,
  longitude: 0,
  imagePath: '',
  soundPath: '',
};

export interface SoundRecordFilter {
  name: string;
  category: number;
  subCategory: number;
}
