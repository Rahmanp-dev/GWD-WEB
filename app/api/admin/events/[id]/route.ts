import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Event from '@/lib/models/Event';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    try {
        const body = await request.json();
        const event = await Event.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });
        if (!event) {
            return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: event });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    try {
        const deletedEvent = await Event.findByIdAndDelete(params.id);
        if (!deletedEvent) {
            return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}