import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Event from '@/lib/models/Event';

export async function GET() {
    await dbConnect();
    try {
        const events = await Event.find({}).sort({ date: -1 });
        return NextResponse.json({ success: true, data: events });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const event = await Event.create(body);
        return NextResponse.json({ success: true, data: event }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}