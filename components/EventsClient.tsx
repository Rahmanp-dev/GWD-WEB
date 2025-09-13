"use client";

import BackgroundParticles from "./BackgroundParticles";
import EventCard from '@/components/cards/EventCard';
import { SerializedEvent, SerializedCarouselImage } from '@/lib/models/Event';
import EventCarousel from './EventCarousel';

interface EventsClientProps {
    events: SerializedEvent[];
    carouselImages: SerializedCarouselImage[];
}

const EventsClient = ({ events, carouselImages }: EventsClientProps) => {
    const upcomingEvents = events.filter((event) => event.status === 'Upcoming');
    const pastEvents = events.filter((event) => event.status === 'Past');

    return (
        <div className="relative min-h-screen text-white">
            <BackgroundParticles />
            <div className="relative z-10">
                {/* Header Section */}
                <header className="relative h-[60vh] flex items-center justify-center text-center">
                    <EventCarousel images={carouselImages} />
                    <div className="relative z-10 p-4">
                        <h1 className="text-6xl font-bold">EVENTS</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg">
                            GWD seeks to actively engage our community with fellowship and collaboration. Below is a list of upcoming events you can attend, join, or explore.
                        </p>
                    </div>
                </header>

                {/* Events List Section */}
                <main className="container mx-auto px-4 py-16">
                    <div className="glass-panel p-8">
                        <h2 className="text-4xl font-bold mb-8">Upcoming Events</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingEvents.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </div>

                        {pastEvents.length > 0 && (
                            <div className="mt-16">
                                <h2 className="text-4xl font-bold mb-8">Past Events</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {pastEvents.map((event) => (
                                        <EventCard key={event._id} event={event} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default EventsClient;
