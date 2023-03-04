import fs from 'fs';
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import HttpError from '../utils/HttpError.js';
import { convertAudio } from '../utils/convertAudio.js';
import { client, bucketName } from '../configs/s3.config.js';

// uploads a file to s3
export const uploadFile = async (file) => {
  if (file.mimetype.substring(0, 5) === 'audio') {
    await convertAudio(file.path);
  }

  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    ContentType: file.mimetype,
  };

  try {
    await client.send(new PutObjectCommand(uploadParams));
  } catch (error) {
    throw new HttpError('Can not upload file to server.', 400);
  } finally {
    // Delete file from uploads folder
    fs.unlink(file.path, (error) => {
      if (error)
        throw new HttpError(
          'Sound Record Sound file does not exist or cannot be deleted.',
          400
        );
    });
  }
};

// downloads a file from s3
export const getFileStream = async (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  try {
    return await client.send(new GetObjectCommand(downloadParams));
  } catch (error) {
    throw new HttpError('Can not get files from server.', 400);
  }
};

export const deleteFile = async (fileKey) => {
  const deleteParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  try {
    return await client.send(new DeleteObjectCommand(deleteParams));
  } catch (error) {
    throw new HttpError('Can not delete files from server.', 400);
  }
};
