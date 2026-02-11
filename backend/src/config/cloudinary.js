import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary key:", process.env.CLOUDINARY_API_KEY);

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    // Delete the local file after uploading
    return result.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.error("Error uploading to Cloudinary:", error);
  }
};

export default uploadOnCloudinary;
