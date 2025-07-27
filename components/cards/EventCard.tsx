import React from 'react';
import { SerializedEvent } from '@/lib/models/Event';

interface EventCardProps {
  event: SerializedEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const eventDate = new Date(event.date);
  const month = eventDate.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase();
  const day = eventDate.getUTCDate();

  return (
    <div className="glass-panel flex flex-col h-full hover:shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden rounded-2xl">
      <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start mb-4">
            <div className="text-center mr-6">
                <p className="text-xl font-bold text-red-500">{month}</p>
                <p className="text-4xl font-bold">{day}</p>
            </div>
            <div className="flex-grow pt-1">
                <h3 className="text-2xl font-bold mb-1 leading-tight">{event.title}</h3>
                <p className="text-gray-400">{event.location}</p>
            </div>
        </div>
        <p className="text-gray-400 mb-4">{event.time}</p>
        <p className="text-gray-300 mb-6 flex-grow">{event.description}</p>
        <a
          href={event.googleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-block border-2 border-red-500 text-white px-6 py-2 rounded-full hover:bg-red-500 transition-colors text-center"
        >
          View Event Details &rarr;
        </a>
      </div>
    </div>
  );
};

export default EventCard;