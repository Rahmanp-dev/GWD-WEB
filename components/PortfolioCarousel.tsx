"use client";

import PortfolioVideo from "@/components/PortfolioVideo";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);
const isImage = (url: string) => /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(url);
const isValidMediaUrl = (url: string) => url && typeof url === 'string' && url.trim() !== '' && url !== '/' && url !== '#';

const PortfolioCarousel = () => {
  const { data: projects, error } = useSWR(
    "/api/portfolio?featured=true&status=published",
    fetcher
  );

  if (error)
    return (
      <div className="text-center text-[rgb(var(--accent))]">
        Failed to load featured projects.
      </div>
    );
  if (!projects)
    return <div className="text-center text-[rgb(var(--foreground-muted))]">Loading...</div>;
  if (projects.length === 0)
    return (
      <div className="text-center text-[rgb(var(--foreground-muted))]">No featured projects yet.</div>
    );

  return (
    <section
      id="portfolio"
      className="glass-panel py-20 bg-white/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/20 shadow-2xl my-16"
      aria-label="Featured Projects Carousel"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          RECENT WORK
        </h2>
        <p className="text-center text-[rgb(var(--foreground-muted))] mb-12">
          Explore our latest{" "}
          <span className="font-semibold text-primary">featured</span> projects
        </p>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-12"
          aria-label="Featured projects carousel"
        >
          {projects.map((item: any, index: number) => {
            const media = item.mediaUrls && item.mediaUrls[0];
            return (
              <SwiperSlide
                key={item._id || index}
                aria-label={`Featured project: ${item.title}`}
                role="group"
                className="flex justify-center"
              >
                <div className="max-w-md w-full bg-white/10 rounded-3xl shadow-xl border border-white/20 glass-panel overflow-hidden flex flex-col items-center mx-auto relative">
                  <span className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-md z-10">
                    {item.domain
                      ?.replace("3d", "3D Animation")
                      .replace("web", "Web")
                      .replace("security", "Security")
                      .replace("video", "Video Editing")
                      .replace("mobile", "Mobile") || "Other"}
                  </span>
                  {media && isValidMediaUrl(media) ? (
                    isVideo(media) ? (
                      <video
                        src={media}
                        className="w-full h-64 object-cover rounded-t-3xl bg-black/60"
                        muted
                        controls
                        style={{ maxHeight: "16rem" }}
                      />
                    ) : isImage(media) ? (
                      <img
                        src={media}
                        alt={item.title + " preview"}
                        className="w-full h-40 md:h-64 object-cover rounded-t-3xl"
                        style={{ maxHeight: "16rem", objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 rounded-t-3xl flex items-center justify-center" role="img" aria-label="No media available" />
                    )
                  ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-t-3xl flex items-center justify-center" role="img" aria-label="No media available" />
                  )}
                  <div className="p-4 md:p-6 w-full">
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-white text-center">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3 justify-center">
                      {item.tags?.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/20 text-[rgb(var(--foreground-muted))] text-xs rounded-full shadow-sm border border-white/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="flex justify-center mt-10">
          <a
            href="/portfolio"
            className="glass-panel px-8 py-3 rounded-full text-lg font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform border border-white/10 backdrop-blur-md focus:outline-none focus:ring-4 focus:ring-pink-300"
            aria-label="See all projects"
            style={{
              textShadow: "0 2px 8px rgba(255,255,255,0.7), 0 1px 0 #fff",
            }}
          >
            See all projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCarousel;
