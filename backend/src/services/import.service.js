import db from '../models/index.js';

const SoundRecord = db.models.SoundRecord;
const SoundRecordPlayLog = db.models.SoundRecordPlayLog;

const importSoundRecordsCSV = async (soundRecords) => {
  try {
    await SoundRecord.bulkCreate(soundRecords, {
      validate: true,
      updateOnDuplicate: [
        'instrument',
        'subCategoryId',
        'description',
        'latitude',
        'longitude',
        'imagePath',
        'soundPath',
        'countryId',
        'level',
        'createdAt',
        'updatedAt',
      ],
    });

    return { message: 'Sound records imported successfully' };
  } catch (error) {
    return { message: 'Could not import sound records' };
  }
};

const importSoundRecordPlayLogsCSV = async (soundRecordPlayLogs) => {
  try {
    await SoundRecordPlayLog.bulkCreate(soundRecordPlayLogs, {
      validate: true,
      updateOnDuplicate: ['playCount'],
      // ignoreDuplicates: true,
    });

    return { message: 'Sound record play logs imported successfully' };
  } catch (error) {
    return { message: 'Could not import sound record play logs' };
  }
};

export default { importSoundRecordsCSV, importSoundRecordPlayLogsCSV };
