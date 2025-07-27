import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { CarouselImage } from '@/lib/models/Event';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    try {
        const image = await CarouselImage.findById(params.id);
        if (!image) {
            return NextResponse.json({ message: 'Image not found' }, { status: 404 });
        }

        // Delete the physical file
        try {
            const imagePath = path.join(process.cwd(), 'public', image.imageUrl);
            await unlink(imagePath);
        } catch (fileError) {
            console.error("Failed to delete image file, but continuing to delete from DB:", fileError);
            // We can choose to continue even if file deletion fails
        }

        // Delete the record from the database
        await CarouselImage.findByIdAndDelete(params.id);

        return NextResponse.json({ message: 'Image deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Failed to delete carousel image:', error);
        return NextResponse.json({ message: 'Failed to delete carousel image' }, { status: 500 });
    }
}