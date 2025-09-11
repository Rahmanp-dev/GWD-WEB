import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable the Next.js body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Configure Multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// The actual upload function that sends the file to Cloudinary
const uploadToCloudinary = (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "uploads" }, // Optional: you can specify a folder in Cloudinary
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary upload failed"));
        resolve(result.secure_url);
      }
    );

    // Use streamifier to pipe the file buffer to the upload stream
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

// The main API handler
export default async function handler(req: NextApiRequest & { file: Express.Multer.File }, res: NextApiResponse) {
  upload.single("file")(req as any, {} as any, async (err) => {
    if (err) {
      return res.status(500).json({ error: "Multer error", details: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file was uploaded." });
    }

    try {
      const secureUrl = await uploadToCloudinary(req.file);
      return res.status(200).json({ secureUrl });
    } catch (error) {
      return res.status(500).json({ error: "Cloudinary upload failed", details: (error as Error).message });
    }
  });
}
