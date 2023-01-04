import fs from 'fs';

const removeSoundRecordUploads = (imagePath, soundPath) => {
  fs.unlink(imagePath, (error) => {
    if (error)
      throw new HttpError(
        'Sound Record Image file does not exist or cannot be deleted.',
        400
      );
  });

  fs.unlink(soundPath, (error) => {
    if (error)
      throw new HttpError(
        'Sound Record Sound file does not exist or cannot be deleted.',
        400
      );
  });
};

export default removeSoundRecordUploads;
