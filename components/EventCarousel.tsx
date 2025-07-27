"use client";

import { SerializedCarouselImage } from '@/lib/models/Event';

interface EventCarouselProps {
    images: SerializedCarouselImage[];
}

/**
 * A simplified, robust carousel component that displays the first available image.
 * This version removes all animations and complex logic to ensure the core functionality
 * of displaying an image works reliably.
 */
const EventCarousel = ({ images }: EventCarouselProps) => {
    // Determine the image URL. Use the first image if available, otherwise use a fallback.
    const hasImages = images && images.length > 0;
    const imageUrl = hasImages ? images[0].imageUrl : '/portfolio/4.jpg';

    // The URL must be properly encoded to handle special characters like spaces.
    const encodedImageUrl = encodeURI(imageUrl);

    return (
        <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
                backgroundImage: `url(${encodedImageUrl})`
            }}
        >
            {/* This is the dark overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
    );
};

export default EventCarousel;