"use client";

import Image from "next/image";
import { useState } from "react";

type PortfolioCardProps = {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  videoUrl?: string;
};

const PortfolioCard = ({
  title,
  description,
  tags,
  imageUrl,
  videoUrl,
}: PortfolioCardProps) => {
  // Debug log
  console.log("PortfolioCard videoUrl:", videoUrl);
  const isVideo =
    typeof videoUrl === "string" && videoUrl.match(/\.(mp4|webm)$/i);
  const [videoError, setVideoError] = useState(false);
  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg border border-white/30 group transition-all duration-300 hover:shadow-red-500/10 hover:border-red-500/20">
      <div className="relative h-64">
        {isVideo && !videoError ? (
          <video
            src={videoUrl}
            className="w-full h-full object-cover absolute inset-0 rounded-t-lg"
            muted
            loop
            preload="metadata"
            poster={imageUrl}
            onMouseOver={(e: React.MouseEvent<HTMLVideoElement>) =>
              e.currentTarget.play()
            }
            onMouseOut={(e: React.MouseEvent<HTMLVideoElement>) =>
              e.currentTarget.pause()
            }
            onError={() => setVideoError(true)}
            aria-label={title + " video preview"}
          />
        ) : (
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
        <p className="text-gray-700 mb-4 text-sm">{description}</p>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-red-600/90 text-white text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
