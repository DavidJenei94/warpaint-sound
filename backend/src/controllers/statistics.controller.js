import statistics from '../services/statistics.service.js';

const getCategoryStats = async (req, res, next) => {
  try {
    res.status(200).json(await statistics.getCategoryStats());
  } catch (err) {
    console.error(`Error while getting category statistics:`, err.message);
    next(err);
  }
};

const getPlayNumbers = async (req, res, next) => {
  try {
    res.status(200).json(await statistics.getPlayNumbers());
  } catch (err) {
    console.error(
      `Error while getting all Sound Record Play Logs:`,
      err.message
    );
    next(err);
  }
};

const incrementPlayNumber = async (req, res, next) => {
  try {
    res
      .status(200)
      .json(await statistics.incrementPlayNumber(req.body.soundRecordId));
  } catch (err) {
    console.error(
      `Error while incrementing Sound Record Play Logs:`,
      err.message
    );
    next(err);
  }
};

export default {
  getCategoryStats,
  getPlayNumbers,
  incrementPlayNumber,
};
