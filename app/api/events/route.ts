import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Event, { CarouselImage, SerializedEvent, SerializedCarouselImage } from '@/lib/models/Event';

export async function GET() {
  await dbConnect();

  try {
    const eventsFromDb = await Event.find({}).sort({ date: -1 });
    const carouselImagesFromDb = await CarouselImage.find({});

    const events: SerializedEvent[] = eventsFromDb.map(event => ({
      _id: event._id.toString(),
      title: event.title,
      location: event.location,
      time: event.time,
      description: event.description,
      imageUrl: event.imageUrl,
      googleFormUrl: event.googleFormUrl,
      status: event.status,
      date: event.date.toISOString(),
    }));

    const carouselImages: SerializedCarouselImage[] = carouselImagesFromDb.map(image => ({
      _id: image._id.toString(),
      imageUrl: image.imageUrl,
    }));

    return NextResponse.json({ success: true, data: { events, carouselImages } });
  } catch (error) {
    console.error('Failed to fetch event data:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
