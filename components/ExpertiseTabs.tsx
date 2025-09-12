import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ExpertiseDomain {
  label: string;
  stack: string[];
}

interface ExpertiseTabsProps {
  domains: ExpertiseDomain[];
}

export const ExpertiseTabs: React.FC<ExpertiseTabsProps> = ({ domains }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  // Detect mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  // Mobile tap handler
  const handleTabClick = (idx: number) => {
    if (openIdx === idx) {
      setOpenIdx(null);
    } else {
      setOpenIdx(idx);
    }
  };

  return (
    <div className="w-full h-full flex flex-row sm:flex-row flex-col sm:gap-6 gap-3 justify-center items-stretch mt-2 mb-10 min-h-[420px] md:min-h-[520px]">
      {domains.map((domain, idx) => {
        const expanded = openIdx === idx;
        return (
          <motion.div
            key={domain.label}
            onMouseEnter={!isMobile ? () => setOpenIdx(idx) : undefined}
            onMouseLeave={!isMobile ? () => setOpenIdx(null) : undefined}
            onClick={isMobile ? () => handleTabClick(idx) : undefined}
            className={`relative flex flex-col items-center justify-center border border-red-500 bg-red-500/10 backdrop-blur-2xl shadow-xl rounded-2xl transition-all duration-700 cursor-pointer overflow-visible ${expanded ? "sm:flex-[6] flex-[unset] bg-red-500/20 border-2 border-red-500 shadow-2xl z-10" : "sm:flex-1 flex-[unset] hover:bg-red-500/10 hover:border-red-500 hover:shadow-2xl"} min-h-[80px] sm:min-h-[320px] h-full w-full sm:w-auto`}
            style={{ minWidth: 64, willChange: "flex, background, box-shadow" }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Label: vertical on desktop, horizontal on mobile */}
            {!expanded && (
              <motion.span
                className="absolute left-1/2 top-1/2 origin-center select-none font-bold text-red-500 text-base sm:text-lg md:text-xl tracking-wider pointer-events-none"
                animate={{
                  rotate: isMobile ? 0 : -90,
                  fontSize: isMobile ? 18 : 18,
                  x: "-50%",
                  y: "-50%",
                  letterSpacing: ".12em",
                }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  width: "auto",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                {domain.label}
              </motion.span>
            )}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, y: 32, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 32, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-4 mt-2"
                >
                  {/* Header label for expanded */}
                  <motion.h3
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="text-red-500 text-2xl sm:text-4xl md:text-5xl font-black text-center mb-6 sm:mb-8 drop-shadow-lg tracking-widest uppercase"
                  >
                    {domain.label}
                  </motion.h3>
                  <ul className="w-full flex flex-col gap-3 sm:gap-4 items-center justify-center">
                    {domain.stack.map((tool, i) => (
                      <li key={tool + i} className="text-red-500 text-base sm:text-lg md:text-2xl py-2 sm:py-3 px-2 sm:px-4 text-center font-mono rounded-full bg-red-500/10 border border-red-500/20 shadow-inner transition-all duration-300 tracking-wide backdrop-blur-sm">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};
