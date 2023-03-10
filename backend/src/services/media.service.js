import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

import config from '../configs/general.config.js';
import { getFileStream } from './aws.service.js';

// used for development
const getFromLocal = async (res, filePath) => {
  res.sendFile(`${config.mainPath}/uploads/${filePath}`);
};

// used for production
const getFromAWS = async (res, filePath) => {
  const mediaFile = await getFileStream(filePath);

  const mediaExtension = filePath.slice(-3);
  if (mediaExtension === 'mp3') {
    // temp file to store until it is sent with res.sendFile
    const tempFile = `${config.mainPath}/uploads/temp-${uuidv4()}`;
    const tempFileStream = fs.createWriteStream(tempFile);

    // delete temp file after it is sent
    await mediaFile.Body.pipe(tempFileStream);
    tempFileStream.on('finish', () => {
      res.sendFile(tempFile, (error) => {
        tempFileStream.end();
        fs.promises.unlink(tempFile);
      });
    });
  } else {
    // normally stream image files
    mediaFile.Body.pipe(res);
  }
};

export default { getFromAWS, getFromLocal };
