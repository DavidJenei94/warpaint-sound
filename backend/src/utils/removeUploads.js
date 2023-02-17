import fs from 'fs';

import HttpError from './HttpError.js';

const removeSoundRecordUploads = (imagePath, soundPath) => {
  try {
    fs.unlinkSync(imagePath);
    fs.unlinkSync(soundPath);
  } catch (error) {
    throw new HttpError(
      'Sound Record Image or Sound file does not exist or cannot be deleted.',
      400
    );
  }
};

export default removeSoundRecordUploads;
