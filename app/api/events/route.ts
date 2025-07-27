import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Event, { CarouselImage } from '@/lib/models/Event';

export async function GET() {
  await dbConnect();

  try {
    const events = await Event.find({}).sort({ date: -1 });
    const carouselImages = await CarouselImage.find({});
    return NextResponse.json({ success: true, data: { events, carouselImages } });
  } catch (error) {
    console.error('Failed to fetch event data:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}