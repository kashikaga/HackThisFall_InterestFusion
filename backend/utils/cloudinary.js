// // const { v2: cloudinary } = require('cloudinary');
// import { v2 as cloudinary } from "cloudinary";
// import streamifier from "streamifier";
// import dotenv from "dotenv";
// dotenv.config(); // Add this line to load .env variables
// // console.log("enterde cloudinary")
// console.log(
//   "this are envvariables",
//   process.env.API_KEY,
//   process.env.API_SECRET,
//   process.env.CLOUD_NAME
// );
const upload_on_cloudinary = async (fileBuffer, folderName = "demo") => {
  // cloudinary.config({
  //   cloud_name: process.env.CLOUD_NAME,
  //   api_key: process.env.API_KEY,
  //   api_secret: process.env.API_SECRET, // Replace this with an environment variable for security
  // });
  // try {
  //   if (!fileBuffer) {
  //     console.log("No file buffer provided");
  //     return null;
  //   }
  //   return new Promise((resolve, reject) => {
  //     const stream = cloudinary.uploader.upload_stream(
  //       {
  //         folder: folderName, // Optional folder in Cloudinary
  //       },
  //       (error, result) => {
  //         if (error) {
  //           console.error("Cloudinary upload error:", error);
  //           reject(error);
  //         } else {
  //           resolve(result.secure_url); // Return the secure URL of the uploaded image
  //         }
  //       }
  //     );
  //     // Pipe the file buffer to Cloudinary's upload stream
  //     streamifier.createReadStream(fileBuffer).pipe(stream);
  //   });
  // } catch (error) {
  //   console.error("Error during Cloudinary upload:", error);
  //   throw error;
  // }
};

export { upload_on_cloudinary };
