import dynamic from "next/dynamic";
import dbConnect from "@/lib/db";
import Event, { CarouselImage } from '@/lib/models/Event';
import { SerializedEvent, SerializedCarouselImage } from '@/lib/models/Event';

// Dynamically import the client component. This is best practice for components
// that use client-side hooks (useState, useEffect, etc.) to prevent them from
// being rendered on the server, which would cause errors.
const EventsClient = dynamic(() => import("@/components/EventsClient"), {
  ssr: false,
});

/**
 * Fetches all event and carousel data directly from the database on the server.
 * This is the most robust and performant method for the initial page load.
 * It completely avoids the fragile server-to-server HTTP `fetch` call that was
 * causing the ECONNRESET error and crashing the page.
 */
async function getData(): Promise<{ events: SerializedEvent[], carouselImages: SerializedCarouselImage[] }> {
  try {
    // Ensure the database connection is established.
    await dbConnect();
    
    // Fetch documents as plain JavaScript objects using .lean() to prevent Mongoose-specific
    // objects from being passed to the client, which would cause serialization errors.
    const eventDocs = await Event.find({}).sort({ date: -1 }).lean();
    const carouselImageDocs = await CarouselImage.find({}).lean();

    // Manually serialize the data to the exact format expected by the client component.
    // This is necessary because database types (like ObjectId and Date) are not directly
    // serializable and cannot be passed from a Server Component to a Client Component.
    // We cast `doc` to `any` here to bypass strict TypeScript errors from .lean()
    // while ensuring the final object structure is correct.
    const events: SerializedEvent[] = eventDocs.map((doc: any) => ({
      _id: doc._id.toString(),
      title: doc.title,
      location: doc.location,
      time: doc.time,
      description: doc.description,
      imageUrl: doc.imageUrl,
      googleFormUrl: doc.googleFormUrl,
      status: doc.status,
      date: doc.date.toISOString(),
    }));

    const carouselImages: SerializedCarouselImage[] = carouselImageDocs.map((doc: any) => ({
      _id: doc._id.toString(),
      imageUrl: doc.imageUrl,
    }));

    return { events, carouselImages };
  } catch (error) {
    console.error("Database fetch failed in /events page:", error);
    // In case of a database error, return empty arrays. This prevents the entire page
    // from crashing and allows it to render gracefully.
    return { events: [], carouselImages: [] };
  }
}

const EventsPage = async () => {
  // Fetch the data on the server during the request.
  const { events, carouselImages } = await getData();

  // Pass the prepared, serialized data as props to the client component.
  return <EventsClient events={events} carouselImages={carouselImages} />;
};

export default EventsPage;