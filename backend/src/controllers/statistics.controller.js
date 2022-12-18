import statistics from '../services/statistics.service.js';

const getCategoryStats = async (req, res, next) => {
  try {
    res.status(200).json(await statistics.getCategoryStats());
  } catch (err) {
    console.error(`Error while getting category statistics:`, err.message);
    next(err);
  }
};

export default {
  getCategoryStats,
};
