import db from '../models/index.js';
import { Parser as CsvParser } from 'json2csv';

const SoundRecord = db.models.SoundRecord;
const SoundRecordPlayLog = db.models.SoundRecordPlayLog;

const exportSoundRecordsCSV = async () => {
  const soundRecordsDb = await SoundRecord.findAll();
  let soundrecords = [];

  soundRecordsDb.forEach((soundRecord) => {
    // convert to object that only contains the datavalues
    soundrecords.push(JSON.parse(JSON.stringify(soundRecord)));
  });

  const csvFields = [
    'id',
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
  ];

  const csvParser = new CsvParser({ csvFields });
  const csvData = csvParser.parse(soundrecords);

  return csvData;
};

const exportSoundRecordPlayLogsCSV = async () => {
  const playLogsDb = await SoundRecordPlayLog.findAll();
  let playLogs = [];

  playLogsDb.forEach((playLog) => {
    // convert to object that only contains the datavalues
    playLogs.push(JSON.parse(JSON.stringify(playLog)));
  });

  const csvFields = [
    'id',
    'year',
    'month',
    'playCount',
  ];

  const csvParser = new CsvParser({ csvFields });
  const csvData = csvParser.parse(playLogs);

  return csvData;
};

export default { exportSoundRecordsCSV, exportSoundRecordPlayLogsCSV };
