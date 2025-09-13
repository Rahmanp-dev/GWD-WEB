'use client';

import Link from 'next/link';
import { SerializedEvent } from '@/lib/models/Event';

interface EventCardProps {
  event: SerializedEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className='glass-panel p-6 rounded-lg'>
      <Link href={`/events/${event._id}`}>
        <div className='cursor-pointer'>
          <img
            src={event.imageUrl}
            alt={event.title}
            className='w-full h-48 object-cover rounded-t-lg'
          />
          <div className='p-4'>
            <h3 className='text-xl font-bold mb-2'>{event.title}</h3>
            <p className='text-gray-400 mb-2'>
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className='text-gray-300'>{event.location}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
