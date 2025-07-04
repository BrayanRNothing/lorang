import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dcdy1huk5',
  api_key: process.env.CLOUDINARY_API_KEY || '232947687718367',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'C920EFBEaP2pO1wPUL52IEx_gcY'
});

export default cloudinary;