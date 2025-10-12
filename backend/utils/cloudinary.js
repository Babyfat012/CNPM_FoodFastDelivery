import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Debug: Log environment variables
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);


cloudinary.config({
    cloud_name: 'dc1vbmwvf',  // Replace with your cloud name
    api_key: '154889875917397',  // Replace with your API key
    api_secret: '2Hy_QeL-h-48cEQUSJhy7-3wM2k',  // Replace with your API secret
  });

  const uploadOnCloudinary = async (localFilepath) => {
    try {
      if (!localFilepath) return null;
  
      const response = await cloudinary.uploader.upload(localFilepath, {
        resource_type: 'auto',
        upload_preset: 'image_preset', // Ensure this preset exists
        timeout: 60000,
      });
  
      console.log('File uploaded to Cloudinary successfully', response.url);
      return response;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      fs.unlinkSync(localFilepath);
      return null;
    }
  };
  
  export { uploadOnCloudinary };