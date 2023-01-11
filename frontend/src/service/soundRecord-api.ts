import { SoundRecord } from '../models/soundrecord.model';
import { backendUrl } from '../utils/general.utils';

// GET ALL
export const fetchSoundRecordsAndCategories = async () => {
  try {
    const response = await fetch(`${backendUrl}/soundRecord`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    const categoryResponse = await fetch(`${backendUrl}/category`);
    const categoryData = await categoryResponse.json();

    if (!response.ok) {
      throw new Error(categoryData.message);
    }

    return { soundRecords: data, categories: categoryData };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// POST
export const addSoundRecord = async (soundRecordFormData: FormData) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: soundRecordFormData,
    };

    const response = await fetch(
      `${backendUrl}/soundRecord`,
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.soundRecord;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// UPDATE
export const editSoundRecord = async (
  soundRecord: SoundRecord,
  token: string
) => {
  try {
    const response = await fetch(
      `${backendUrl}/soundRecord/${soundRecord.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({ soundRecord }),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// DELETE
export const deleteSoundRecord = async (id: number, token: string) => {
  try {
    const response = await fetch(`${backendUrl}/soundRecord/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-access-token': token },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
