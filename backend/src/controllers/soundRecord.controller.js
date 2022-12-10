import soundRecord from '../services/soundRecord.service.js';

const getAll = async (req, res, next) => {
  try {
    res.status(200).json(await soundRecord.getAll());
  } catch (err) {
    console.error(`Error while getting all routes:`, err.message);
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    res
      .status(200)
      .json(await soundRecord.create(req.body, req.files));
  } catch (err) {
    console.error(`Error while creating soundRecord:`, err.message);
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    res.status(200).json(await soundRecord.get(req.params.soundRecordId));
  } catch (err) {
    console.error(`Error while getting soundRecord:`, err.message);
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    res.status(200).json(await soundRecord.update(req.params.soundRecord));
  } catch (err) {
    console.error(`Error while updateing soundRecord:`, err.message);
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    res.status(200).json(await soundRecord.remove(req.params.soundRecordId));
  } catch (err) {
    console.error(`Error while removing soundRecord:`, err.message);
    next(err);
  }
};

export default {
  getAll,
  create,
  get,
  update,
  remove,
};
