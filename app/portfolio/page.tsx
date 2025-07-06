"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation as SwiperNavigation, Thumbs as SwiperThumbs } from "swiper/modules";

const DOMAIN_TABS = [
  { label: "All", value: "all" },
  { label: "Web Dev", value: "web" },
  { label: "Mobile/App Dev", value: "mobile" },
  { label: "3D Animation", value: "3d" },
  { label: "Security", value: "security" },
  { label: "Video Editing", value: "video" },
  { label: "Game Dev", value: "game" },
];

interface Project {
  id: string;
  title: string;
  slug: string;
  domain: string;
  yearStart: number;
  yearEnd: number;
  mediaUrls: string[];
  descriptionMarkdown: string;
  featured: boolean;
}

const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);
const isImage = (url: string) => /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(url);

const isValidMediaUrl = (url: string) => {
  if (!url || typeof url !== 'string') return false;
  if (url.trim() === '' || url === '/' || url === '#') return false;
  return true;
};

function stripHtmlTags(str: string) {
  return str.replace(/<[^>]*>?/gm, '');
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [videoErrorTiles, setVideoErrorTiles] = useState<{ [id: string]: boolean }>({});
  const [videoErrorCarousel, setVideoErrorCarousel] = useState<{ [idx: number]: boolean }>({});
  const [videoErrorThumbs, setVideoErrorThumbs] = useState<{ [idx: number]: boolean }>({});

  useEffect(() => {
    fetch(`/api/portfolio${selectedDomain !== "all" ? `?domain=${selectedDomain}` : ""}`)
      .then((r) => r.json())
      .then((data) => {
        setProjects(data);
        if (data.length > 0) setSelectedProject(data[0]);
        else setSelectedProject(null);
      });
  }, [selectedDomain]);

  return (
    <div className="flex min-h-screen w-full bg-transparent bg-dot-red/[0.2] bg-fixed bg-cover flex-col md:flex-row">
      {/* Left: Grid & Filters (Top on mobile) */}
      <div
        className="w-full md:w-2/5 p-4 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-2 border-white/20 shadow-2xl glass-left-pane"
        style={{ background: "rgba(30,30,40,0.35)", backdropFilter: "blur(28px)" }}
      >
        <div className="flex items-center justify-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-red-500 drop-shadow-glow">Portfolio</h1>
        </div>
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8 justify-center overflow-x-auto">
          {DOMAIN_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedDomain(tab.value)}
              className={`px-4 py-1.5 rounded-full font-semibold text-xs md:text-sm shadow transition-all duration-150 border
                ${selectedDomain === tab.value
                  ? "bg-red-600 text-white border-red-600 drop-shadow-glow"
                  : "bg-white/10 text-gray-200 border-white/20 hover:bg-red-500/70 hover:text-white hover:border-red-500/70"}
              `}
              style={{ minWidth: '80px' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          className="grid grid-cols-2 gap-3 md:grid-cols-2 flex-1 overflow-y-auto min-h-0 min-w-0"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`relative rounded-2xl cursor-pointer group transition-all duration-200 border border-white/20 shadow-xl hover:scale-105 hover:shadow-red-500/40 hover:border-red-500/80 ${selectedProject?.id === project.id ? "ring-2 ring-red-500" : ""} h-40 md:h-64 min-h-0 min-w-0 flex flex-col justify-between`}
              style={{ background: "#18181c" }}
              onClick={() => setSelectedProject(project)}
            >
              {project.mediaUrls && project.mediaUrls[0] && isValidMediaUrl(project.mediaUrls[0]) ? (
                isImage(project.mediaUrls[0]) ? (
                  <img src={project.mediaUrls[0]} alt={project.title} className="w-full h-2/3 object-cover rounded-2xl" />
                ) : isVideo(project.mediaUrls[0]) ? (
                  <video src={project.mediaUrls[0]} className="w-full h-2/3 object-cover rounded-2xl bg-black/60" muted playsInline preload="metadata" controls={false} />
                ) : (
                  <div className="w-full h-2/3 flex items-center justify-center bg-white/5 text-gray-400 rounded-2xl">No Media</div>
                )
              ) : (
                <div className="w-full h-2/3 flex items-center justify-center bg-white/5 text-gray-400 rounded-2xl">No Media</div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center text-xs md:text-sm font-bold rounded-b-2xl py-2">
                {project.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right: Detail Pane (Bottom on mobile) */}
      <div className="w-full md:w-3/5 p-4 md:p-10 flex flex-col items-center justify-center bg-transparent relative overflow-y-auto max-h-screen">
        {selectedProject ? (
          <div className="w-full max-w-3xl p-4 md:p-8 rounded-3xl border border-white/30 shadow-2xl relative glass-detail-pane" style={{background: "rgba(30,30,40,0.45)", backdropFilter: "blur(32px)"}}>
            {/* Carousel */}
            {(selectedProject?.mediaUrls || []).length > 0 ? (
              <Swiper
                modules={[SwiperNavigation, SwiperThumbs]}
                navigation
                thumbs={thumbsSwiper && thumbsSwiper.el ? { swiper: thumbsSwiper } : undefined}
                className="rounded-2xl mb-4 shadow-lg w-full"
                style={{ background: "rgba(255,255,255,0.13)", backdropFilter: "blur(12px)", minHeight: "220px", maxHeight: "520px" }}
              >
                {(selectedProject?.mediaUrls || []).map((url, idx) => (
                  <SwiperSlide key={idx}>
                    {isValidMediaUrl(url) && isVideo(url) && !videoErrorCarousel[idx] ? (
                      <video
                        src={url}
                        className="w-full aspect-video md:h-[420px] object-cover rounded-2xl"
                        muted
                        controls
                        onError={() => setVideoErrorCarousel(errs => ({ ...errs, [idx]: true }))}
                      />
                    ) : isValidMediaUrl(url) && isImage(url) ? (
                      <img src={url} className="w-full aspect-video md:h-[420px] object-cover rounded-2xl" alt="media" />
                    ) : (
                      <div className="w-full aspect-video md:h-[420px] flex items-center justify-center bg-white/10 text-gray-400 rounded-2xl mb-4">No Media</div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full aspect-video md:h-[420px] flex items-center justify-center bg-white/10 text-gray-400 rounded-2xl mb-4">No Media</div>
            )}
            {/* Media Gallery Row */}
            {(selectedProject?.mediaUrls || []).length > 1 && (
              <div className="flex flex-row gap-2 md:gap-3 justify-center items-center mt-4 md:mt-6 mb-4 md:mb-6 overflow-x-auto">
                {(selectedProject?.mediaUrls || []).map((url, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden border border-white/20 bg-black/30 w-14 h-10 md:w-20 md:h-14 flex items-center justify-center">
                    {isValidMediaUrl(url) && isVideo(url) ? (
                      <video src={url} className="w-full h-full object-cover bg-black/60" muted playsInline preload="metadata" controls={false} />
                    ) : isValidMediaUrl(url) && isImage(url) ? (
                      <img src={url} className="w-full h-full object-cover" alt="thumb" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Media</div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {/* Details */}
            <h2 className="text-lg md:text-2xl text-white font-bold mb-1">{selectedProject.title}</h2>
            <div className="prose prose-invert max-w-none mb-2">
              <ReactMarkdown>
                {stripHtmlTags(selectedProject.descriptionMarkdown)}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-lg md:text-xl">Select a project to view details.</div>
        )}
      </div>
      <style jsx global>{`
        .glass-detail-pane {
          background: rgba(30,30,40,0.45) !important;
          border: 1.5px solid rgba(255,255,255,0.18) !important;
          backdrop-filter: blur(32px) !important;
          box-shadow: 0 0 60px 8px #f43f5e22, 0 12px 60px rgba(0,0,0,0.28);
        }
        .glass-left-pane {
          background: rgba(30,30,40,0.35) !important;
          border: 1.5px solid rgba(255,255,255,0.13) !important;
          backdrop-filter: blur(28px) !important;
          box-shadow: 0 0 32px 4px #f43f5e11, 0 4px 32px rgba(0,0,0,0.18);
        }
      `}</style>
    </div>
  );
}
