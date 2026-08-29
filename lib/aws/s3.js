import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const s3BucketName = process.env.AWS_BUCKET_NAME;

export function getS3ObjectUrl(key) {
  return `https://${s3BucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
