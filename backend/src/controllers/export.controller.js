import exportService from '../services/export.service.js';

const exportSoundRecords = async (req, res, next) => {
  try {
    const csvData = await exportService.exportSoundRecordsCSV();

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=rs.csv');
    res.status(200).end(csvData);
  } catch (error) {
    console.error(`Error while exporting Sound Records:`, err.message);
    next(err);
  }
};

const exportSoundRecordPlayLogs = async (req, res, next) => {
  try {
    const csvData = await exportService.exportSoundRecordPlayLogsCSV();

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=rs.csv');
    res.status(200).end(csvData);
  } catch (error) {
    console.error(`Error while exporting Sound Record Playlogs:`, err.message);
    next(err);
  }
};

export default {
  exportSoundRecords,
  exportSoundRecordPlayLogs,
};
