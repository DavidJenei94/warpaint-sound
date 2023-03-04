import fs from 'fs';
import HttpError from './HttpError.js';

import ffmpegInstall from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
ffmpeg.setFfmpegPath(ffmpegInstall.path);

// convert audio file to mp3 (audio/mpeg)
export const convertAudio = async (filePath) => {
  const fileName = filePath.substring(8);
  const newFileName = `_${fileName}`;
  const newFilePath = `${filePath.substring(0, 8)}${newFileName}`;

  try {
    // convert to audio/mpeg
    await ffmpegSync(filePath, newFilePath);
    // delete original file
    await fs.promises.unlink(filePath);
    // rename new file to original file name
    await fs.promises.rename(newFilePath, filePath);
  } catch (error) {
    throw new HttpError(error, 400);
  }
};

const ffmpegSync = (filePath, newFilePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .toFormat('mp3')
      .on('error', (err) => {
        return reject(new Error(err));
      })
      .save(newFilePath)
      .on('end', () => {
        resolve();
      });
  });
};
