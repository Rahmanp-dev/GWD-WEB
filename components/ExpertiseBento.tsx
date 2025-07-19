import React from "react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { IconCloud } from "./magicui/icon-cloud";

const expertise = [
  {
    title: "WEB DEVELOPMENT",
    description: "Modern, scalable, and beautiful web apps.",
    slugs: [
      "react", "nextdotjs", "nodedotjs", "express", "mongodb", "typescript", "javascript", "html5", "css3"
    ],
  },
  {
    title: "MOBILE APPS",
    description: "Cross-platform mobile experiences.",
    slugs: [
      "flutter", "react", "android", "firebase", "kotlin", "javascript", "androidstudio"
    ],
  },
  {
    title: "3D & DESIGN",
    description: "Immersive 3D, design, and animation.",
    slugs: [
      "blender", "figma", "adobeaftereffects"
    ],
  },
  {
    title: "CYBERSECURITY",
    description: "Secure, robust, and reliable systems.",
    slugs: [
      "burpsuite", "wireshark", "nginx", "docker"
    ],
  },
  {
    title: "VIDEO PRODUCTION",
    description: "High-quality video editing and streaming.",
    slugs: [
      "adobepremierepro", "davinciresolve"
    ],
  },
];

export function ExpertiseBento() {
  return (
    <section className="py-20 bg-white/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/20 shadow-2xl my-16 w-full px-2 md:px-8">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-16 text-center tracking-tight drop-shadow-lg">
        Our Expertise
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        {expertise.map((item, i) => {
          const isEven = i % 2 === 1;
          const images = item.slugs.map(
            (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
          );
          return (
            <div
              key={item.title}
              className="glass-panel rounded-3xl shadow-xl border border-white/30 dark:border-white/20 overflow-hidden flex flex-col md:flex-row items-center mx-auto relative backdrop-blur-2xl max-w-lg w-full"
              style={{ minHeight: 320 }}
            >
              {isEven ? (
                <>
                  {/* Text Left, Icon Right */}
                  <div className="flex-1 flex flex-col items-center md:items-start justify-center md:pr-8 p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900 dark:text-white text-center md:text-left">
                      {item.title}
                    </h3>
                    <TextGenerateEffect
                      words={item.description}
                      className="text-base md:text-lg text-gray-700 dark:text-neutral-200 max-w-xl text-center md:text-left"
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-center p-4 md:p-6">
                    <div className="w-[160px] h-[160px] md:w-[220px] md:h-[220px] flex items-center justify-center">
                      <IconCloud images={images} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Icon Left, Text Right */}
                  <div className="flex-1 flex items-center justify-center p-4 md:p-6">
                    <div className="w-[160px] h-[160px] md:w-[220px] md:h-[220px] flex items-center justify-center">
                      <IconCloud images={images} />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center md:items-start justify-center md:pl-8 p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900 dark:text-white text-center md:text-left">
                      {item.title}
                    </h3>
                    <TextGenerateEffect
                      words={item.description}
                      className="text-base md:text-lg text-gray-700 dark:text-neutral-200 max-w-xl text-center md:text-left"
                    />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
} 