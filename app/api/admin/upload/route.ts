import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// A helper function to upload a buffer to Cloudinary
const uploadToCloudinary = (fileBuffer: Buffer, folder: string): Promise<{ secure_url: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folder, resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(new Error('Cloudinary upload failed.'));
        }
        if (result) {
          resolve({ secure_url: result.secure_url });
        } else {
          reject(new Error('Cloudinary upload returned no result.'));
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: "No file provided." }, { status: 400 });
    }

    const folder = formData.get('folder') as string || 'general';

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload the file to Cloudinary
    const result = await uploadToCloudinary(buffer, folder);

    return NextResponse.json({ secureUrl: result.secure_url });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error("Upload API Error:", error);
    return NextResponse.json({ message: "Upload failed", details: message }, { status: 500 });
  }
}
