import dynamic from "next/dynamic";
import dbConnect from "@/lib/db";
import Event, { CarouselImage, IEvent, ICarouselImage } from '@/lib/models/Event';

// Dynamically import the client component.
const EventsClient = dynamic(() => import("@/components/EventsClient"), {
  ssr: false,
});

// Define a serializable version of the Event and CarouselImage types
export type SerializableEvent = Omit<IEvent, 'date'> & { _id: string; date: string; };
export type SerializableCarouselImage = { _id: string; imageUrl: string; };


/**
 * Fetches all event and carousel data directly from the database on the server.
 */
async function getData(): Promise<{ events: SerializableEvent[], carouselImages: SerializableCarouselImage[] }> {
  try {
    await dbConnect();
    
    const eventDocs = await Event.find({}).sort({ date: -1 }).lean();
    const carouselImageDocs = await CarouselImage.find({}).lean();

    const events: SerializableEvent[] = eventDocs.map((doc: any) => ({
      ...doc,
      _id: doc._id.toString(),
      date: doc.date.toISOString(),
    }));

    const carouselImages: SerializableCarouselImage[] = carouselImageDocs.map((doc: any) => ({
      ...doc,
      _id: doc._id.toString(),
    }));

    return { events, carouselImages };
  } catch (error) {
    console.error("Database fetch failed in /events page:", error);
    return { events: [], carouselImages: [] };
  }
}

const EventsPage = async () => {
  const { events, carouselImages } = await getData();

  return <EventsClient events={events} carouselImages={carouselImages} />;
};

export default EventsPage;
