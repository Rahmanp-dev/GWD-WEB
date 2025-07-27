import EventForm from "@/components/forms/EventForm";
import dbConnect from "@/lib/db";
import Event from "@/lib/models/Event";
import { SerializedEvent } from "@/lib/models/Event";

async function getEvent(id: string) {
    await dbConnect();
    const event = await Event.findById(id);
    if (!event) {
        return null;
    }
    return JSON.parse(JSON.stringify(event));
}


const EditEventPage = async ({ params }: { params: { id: string } }) => {
    const event: SerializedEvent | null = await getEvent(params.id);

    if (!event) {
        return <div className="container mx-auto px-4 py-8">Event not found.</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Edit Event</h1>
            <EventForm event={event} />
        </div>
    );
};

export default EditEventPage;