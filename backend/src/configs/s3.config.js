import fs from 'fs';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import HttpError from '../utils/HttpError.js';

const bucketName = process.env.AWS_UPLOADS_BUCKET;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

// uploads a file to s3
export const uploadFile = async (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
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

  console.log(deleteParams);
  try {
    return await client.send(new DeleteObjectCommand(deleteParams));
  } catch (error) {
    throw new HttpError('Can not delete files from server.', 400);
  }
};
