"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import PortfolioCard from "./PortfolioCard";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  mediaUrl: string;
  videoUrl?: string;
  description: string;
  tags?: string[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const categories = ["all", "web", "app", "dm", "3d", "video"];

const PortfolioGallery = () => {
  console.log("PortfolioGallery loaded");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const { data: rawItems, error } = useSWR<any[]>(
    `/api/portfolio?category=${activeCategory === "all" ? "" : activeCategory}`,
    fetcher,
    {
      fallbackData: [
        // Mock data for initial load
        {
          id: "1",
          title: "Corporate Website",
          category: "web",
          mediaUrl: "/portfolio/1.jpg",
          description:
            "A full-featured corporate website with a modern design and CMS integration.",
        },
        {
          id: "2",
          title: "Mobile Banking App",
          category: "app",
          mediaUrl: "/portfolio/1.jpg",
          description:
            "A secure and intuitive mobile banking application for iOS and Android.",
        },
        {
          id: "3",
          title: "Social Media Campaign",
          category: "dm",
          mediaUrl: "/portfolio/1.jpg",
          description:
            "A viral social media campaign that reached millions of users.",
        },
      ],
    }
  );

  if (!rawItems) {
    console.log("PortfolioGallery: rawItems is undefined or null");
  } else if (Array.isArray(rawItems) && rawItems.length === 0) {
    console.log("PortfolioGallery: rawItems is an empty array");
  } else {
    console.log("PortfolioGallery rawItems:", rawItems);
  }

  const items: PortfolioItem[] = (rawItems || []).map((item: any) => ({
    id: item._id || item.id,
    title: item.title,
    category: item.domain || item.category,
    mediaUrl: (item.images && item.images[0]) || item.mediaUrl || "",
    videoUrl: item.videoUrl,
    description: item.description,
    tags: item.tags,
  }));

  if (error) return <div>Failed to load portfolio</div>;
  if (!items) return <div>Loading...</div>;

  return (
    <section id="portfolio" className="py-20">
      <h2 className="text-4xl font-bold text-center mb-10">Our Work</h2>
      <div className="flex justify-center mb-8 space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`capitalize px-4 py-2 rounded-full font-semibold transition-colors ${
              activeCategory === category
                ? "bg-primary text-white"
                : "bg-bgGray hover:bg-hoverGray"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            style={{ cursor: "pointer" }}
          >
            <PortfolioCard
              title={item.title}
              description={item.description}
              tags={item.tags || []}
              imageUrl={item.mediaUrl}
              videoUrl={item.videoUrl}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white rounded-lg overflow-hidden max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-96">
                {selectedItem.videoUrl &&
                (selectedItem.videoUrl.endsWith(".mp4") ||
                  selectedItem.videoUrl.endsWith(".webm")) ? (
                  <video
                    src={selectedItem.videoUrl}
                    className="w-full h-full object-cover rounded-t-lg"
                    controls
                    muted
                    loop
                    preload="metadata"
                    poster={selectedItem.mediaUrl}
                    style={{ maxHeight: "24rem" }}
                  />
                ) : selectedItem.videoUrl &&
                  (selectedItem.videoUrl.includes("youtube.com") ||
                    selectedItem.videoUrl.includes("youtu.be")) ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${
                      selectedItem.videoUrl.split("v=")[1] || ""
                    }`}
                    className="w-full h-full rounded-t-lg"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{ maxHeight: "24rem" }}
                  />
                ) : (
                  <Image
                    src={selectedItem.mediaUrl}
                    alt={selectedItem.title}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold">{selectedItem.title}</h3>
                <p className="text-primary capitalize mt-1">
                  {selectedItem.category}
                </p>
                <p className="mt-4 text-gray-600">{selectedItem.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioGallery;
