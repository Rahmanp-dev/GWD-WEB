import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { CarouselImage } from '@/lib/models/Event';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
    await dbConnect();
    try {
        const images = await CarouselImage.find({});
        return NextResponse.json(images);
    } catch (error) {
        console.error('Failed to fetch carousel images:', error);
        return NextResponse.json({ message: 'Failed to fetch carousel images' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize the filename to remove special characters and spaces
        const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const filename = `${Date.now()}-${sanitizedFilename}`;
        
        const imagePath = path.join(process.cwd(), 'public/uploads', filename);
        await writeFile(imagePath, buffer);
        const imageUrl = `/uploads/${filename}`;

        const newImage = new CarouselImage({ imageUrl });
        await newImage.save();

        return NextResponse.json(newImage, { status: 201 });
    } catch (error) {
        console.error('Failed to upload carousel image:', error);
        return NextResponse.json({ message: 'Failed to upload carousel image' }, { status: 500 });
    }
}