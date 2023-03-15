import importService from '../services/import.service.js';

const importSoundRecords = async (req, res, next) => {
  try {
    res
      .status(200)
      .json(await importService.importSoundRecordsCSV(req.body.soundrecords));
  } catch (err) {
    console.error(`Error while importing Sound Records:`, err.message);
    next(err);
  }
};

const importSoundRecordPlayLogs = async (req, res, next) => {
  try {
    res
      .status(200)
      .json(
        await importService.importSoundRecordPlayLogsCSV(
          req.body.soundrecordplaylogs
        )
      );
  } catch (err) {
    console.error(`Error while importing Sound Record Playlogs:`, err.message);
    next(err);
  }
};

export default {
  importSoundRecords,
  importSoundRecordPlayLogs,
};
