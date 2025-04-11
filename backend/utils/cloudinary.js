const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

console.log(
  "These are env variables:",
  process.env.API_KEY,
  process.env.API_SECRET,
  process.env.CLOUD_NAME
);

const upload_on_cloudinary = async (fileBuffer, folderName = "demo") => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  try {
    if (!fileBuffer) {
      console.log("No file buffer provided");
      return null;
    }

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: folderName,
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );

      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  } catch (error) {
    console.error("Error during Cloudinary upload:", error);
    throw error;
  }
};

module.exports = { upload_on_cloudinary };
