import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

import HttpError from '../utils/HttpError.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop();
    cb(null, `${Date.now()}-${uuidv4()}.${fileExtension}`);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'audio/wav'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new HttpError('Only .png, .jpg, .jpeg format allowed!');
      err.name = 'ExtensionError';
      return cb(err);
    }
  },
});

export const acceptedFiles = [
  {
    name: 'soundFile',
    maxCount: 1,
  },
  {
    name: 'imageFile',
    maxCount: 1,
  },
];

export default upload;
