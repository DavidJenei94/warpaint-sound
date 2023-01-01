import fs from 'fs';

const removeSoundRecordUploads = (files) => {
  fs.unlink(files.imageFile[0].path, (error) => {
    if (error)
      throw new HttpError(
        'Sound Record Image file does not exist or cannot be deleted.',
        400
      );
  });

  fs.unlink(files.soundFile[0].path, (error) => {
    if (error)
      throw new HttpError(
        'Sound Record Sound file does not exist or cannot be deleted.',
        400
      );
  });
};

export default removeSoundRecordUploads;
