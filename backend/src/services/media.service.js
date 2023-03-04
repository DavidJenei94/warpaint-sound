import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

import { getFileStream } from './aws.service.js';

// To Replicate __ dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Path of the project
const relativeMainIndex = __dirname.indexOf('/src/');
const mainPath = __dirname.substring(0, relativeMainIndex);

// used for development
const getFromLocal = async (res, filePath) => {
  res.sendFile(`${mainPath}/uploads/${filePath}`);
};

// used for production
const getFromAWS = async (res, filePath) => {
  const mediaFile = await getFileStream(filePath);

  const mediaExtension = filePath.slice(-3);
  if (mediaExtension === 'mp3') {
    // temp file to store until it is sent with res.sendFile
    const tempFile = `${mainPath}/uploads/temp-${uuidv4()}`;
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
