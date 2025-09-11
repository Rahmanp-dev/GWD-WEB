import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import { CarouselImage } from '@/lib/models/Event';

// GET all images
export async function GET() {
    await dbConnect();
    try {
        const images = await CarouselImage.find({}).sort({ createdAt: -1 });
        return NextResponse.json(images);
    } catch (error) {
        console.error('Failed to fetch carousel images:', error);
        return NextResponse.json({ message: 'Failed to fetch carousel images' }, { status: 500 });
    }
}

// POST a new image URL
export async function POST(request: Request) {
    await dbConnect();
    try {
        const { imageUrl } = await request.json();

        if (!imageUrl) {
            return NextResponse.json({ message: 'Image URL is required' }, { status: 400 });
        }

        const newImage = new CarouselImage({ imageUrl });
        await newImage.save();

        return NextResponse.json(newImage, { status: 201 });
    } catch (error) {
        console.error('Failed to save image URL:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message: 'Failed to save image URL', error: errorMessage }, { status: 500 });
    }
}

// DELETE an image
export async function DELETE(request: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'Image ID is required' }, { status: 400 });
        }

        const deletedImage = await CarouselImage.findByIdAndDelete(id);

        if (!deletedImage) {
            return NextResponse.json({ message: 'Image not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Failed to delete image:', error);
        return NextResponse.json({ message: 'Failed to delete image' }, { status: 500 });
    }
}
