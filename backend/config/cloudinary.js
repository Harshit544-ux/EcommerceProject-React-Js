import {v2 as cloudinary } from 'cloudinary'

const connectCloudinary = ()=>{
    cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_SECRET_KEY
    })
}

export const uploadToCloudinary = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        public_id: `products/${filename}`,
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    ).end(buffer);
  });
};

export default connectCloudinary;