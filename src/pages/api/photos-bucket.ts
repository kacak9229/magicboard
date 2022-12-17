// pages/api/photos-bucket.js
import { APIRoute } from "next-s3-upload";

export default APIRoute.configure({
  accessKeyId: process.env.S3_UPLOAD_KEY,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
  bucket: process.env.S3_UPLOAD_BUCKET_PHOTOS,
  region: process.env.S3_UPLOAD_REGION,
});
