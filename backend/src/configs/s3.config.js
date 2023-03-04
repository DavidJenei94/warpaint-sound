import { S3Client } from '@aws-sdk/client-s3';

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

export const client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

export const bucketName = process.env.AWS_UPLOADS_BUCKET;
