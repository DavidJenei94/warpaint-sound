import statistics from '../services/statistics.service.js';

const getCategoryStats = async (req, res, next) => {
  try {
    res.status(200).json(await statistics.getCategoryStats());
  } catch (err) {
    console.error(`Error while getting category statistics:`, err.message);
    next(err);
  }
};

const getPlayCounts = async (req, res, next) => {
  try {
    res.status(200).json(await statistics.getPlayCounts());
  } catch (err) {
    console.error(
      `Error while getting all Sound Record Play Logs:`,
      err.message
    );
    next(err);
  }
};

const incrementPlayCount = async (req, res, next) => {
  try {
    res
      .status(200)
      .json(await statistics.incrementPlayCount(req.body.soundRecordId));
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
  getPlayCounts,
  incrementPlayCount,
};
