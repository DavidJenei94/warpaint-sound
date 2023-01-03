import { backendUrl } from '../utils/general.utils';

const fetchSoundRecordsAndCategories = async () => {
  try {
    const response = await fetch(`${backendUrl}/api/soundRecord`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    const categoryResponse = await fetch(`${backendUrl}/api/category`);
    const categoryData = await categoryResponse.json();

    if (!response.ok) {
      throw new Error(categoryData.message);
    }

    return { soundRecords: data, categories: categoryData };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default fetchSoundRecordsAndCategories;
