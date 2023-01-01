import soundRecord from '../services/soundRecord.service.js';
import removeSoundRecordUploads from '../utils/removeUploads.js';

const getAll = async (req, res, next) => {
  try {
    res.status(200).json(await soundRecord.getAll(req.query.searchText));
  } catch (err) {
    console.error(`Error while getting all Sound Record:`, err.message);
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    res.status(200).json(await soundRecord.create(req.body, req.files));
  } catch (err) {
    removeSoundRecordUploads(req.files);
    console.error(`Error while creating Sound Record:`, err.message);
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    res.status(200).json(await soundRecord.get(req.params.soundRecordId));
  } catch (err) {
    console.error(`Error while getting Sound Record:`, err.message);
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    res.status(200).json(await soundRecord.update(req.params.soundRecord));
  } catch (err) {
    console.error(`Error while updating Sound Record:`, err.message);
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    res.status(200).json(await soundRecord.remove(req.params.soundRecordId));
  } catch (err) {
    console.error(`Error while removing Sound Record:`, err.message);
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
