import category from '../services/category.service.js';

const getAll = async (req, res, next) => {
  try {
    res.status(200).json(await category.getAll());
  } catch (err) {
    console.error(`Error while getting all routes:`, err.message);
    next(err);
  }
};

export default {
  getAll,
};
