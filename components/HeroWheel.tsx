"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Code,
  Cuboid,
  Film,
  Megaphone,
  ShieldCheck,
  Smartphone,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const services = [
  { key: "web", label: "Web Dev", icon: Code },
  { key: "app", label: "App Dev", icon: Smartphone },
  { key: "dm", label: "Marketing", icon: Megaphone },
  { key: "3d", label: "3D & Motion", icon: Cuboid },
  { key: "video", label: "Video Edit", icon: Film },
  { key: "ai", label: "AI Tools", icon: Bot },
  { key: "devops", label: "DevOps", icon: Wrench },
  { key: "security", label: "Security", icon: ShieldCheck },
];

const WHEEL_DIAMETER = 400;
const RADIUS = WHEEL_DIAMETER / 2;

function getSectorIndex(
  x: number,
  y: number,
  cx: number,
  cy: number,
  n: number
) {
  let theta = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
  if (theta < 0) theta += 360;
  let corrected = (theta + 90) % 360;
  const sectorSize = 360 / n;
  return Math.floor(corrected / sectorSize);
}

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};

const HeroWheel = ({
  onSelect,
}: {
  onSelect: (serviceKey: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const centerButtonRef = useRef<HTMLDivElement>(null);
  const previousIsOpen = useRef(false);

  useEffect(() => {
    if (previousIsOpen.current && !isOpen && hoveredIndex !== null) {
      setSelectedIndex(hoveredIndex);
      onSelect(services[hoveredIndex].key);
      const timer = setTimeout(() => setSelectedIndex(null), 400);
      return () => clearTimeout(timer);
    }
    previousIsOpen.current = isOpen;
  }, [isOpen, hoveredIndex, onSelect]);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!centerButtonRef.current) return;
    const { top, left, width, height } =
      centerButtonRef.current.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const index = getSectorIndex(e.clientX, e.clientY, cx, cy, services.length);
    setHoveredIndex(index);
  }, []);

  const handlePointerUp = useCallback(() => {
    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
    setIsOpen(false);
  }, [handlePointerMove]);

  const handlePointerDown = () => {
    setHoveredIndex(null); // Reset on new interaction
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    setIsOpen(true);
  };

  const handleWheel = (e: WheelEvent) => {
    if (!isOpen) return;
    e.preventDefault();
    const direction = e.deltaY > 0 ? 1 : -1;
    setHoveredIndex((prev) => {
      const current = prev ?? -1;
      return (current + direction + services.length) % services.length;
    });
  };

  useEffect(() => {
    const wheelContainer = centerButtonRef.current?.parentElement;
    if (wheelContainer) {
      wheelContainer.addEventListener("wheel", handleWheel, { passive: false });
      return () => wheelContainer.removeEventListener("wheel", handleWheel);
    }
  }, [isOpen]);

  const SECTOR_SIZE = 360 / services.length;
  const isFinalSelection = selectedIndex !== null;

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center h-screen text-gray-800 dark:text-white select-none"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div
        ref={centerButtonRef}
        onPointerDown={handlePointerDown}
        className="z-20 flex items-center justify-center w-32 h-32 rounded-full glass-panel shadow-lg cursor-pointer select-none focus:outline-none focus:ring-0 outline-none ring-0 border-0"
        role="button"
        aria-label="Open service selection wheel"
        onDragStart={(e) => e.preventDefault()}
      >
        <Image
          src="/logo.png"
          alt="GWD Logo"
          width={400}
          height={400}
          priority
          draggable="false"
          className="rounded-full"
        />
      </div>
      {/* Show hint message below button when wheel is not open */}
      {!isOpen && selectedIndex === null && (
        <motion.div
          initial={{ opacity: 0.85, scale: 1 }}
          animate={{
            opacity: 1,
            scale: 1.04,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="mt-6 px-6 py-3 rounded-xl glass-panel backdrop-blur-md shadow text-center text-gray-700 dark:text-gray-200 text-base font-medium select-none border border-white/30 dark:border-white/20"
        >
          Hold and rotate to choose a service
        </motion.div>
      )}

      <AnimatePresence>
        {(isOpen || isFinalSelection) && (
          <motion.div
            className="absolute z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.2, delay: isFinalSelection ? 0.2 : 0 },
            }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ width: WHEEL_DIAMETER, height: WHEEL_DIAMETER }}
            >
              {/* Glassmorphic background disk */}
              <div
                className="backdrop-blur-2xl bg-white/30 dark:bg-white/10 border border-white/30 dark:border-white/20 shadow-2xl rounded-full outline-none ring-0 border-0"
                style={{
                  width: WHEEL_DIAMETER,
                  height: WHEEL_DIAMETER,
                  position: "absolute",
                  left: 0,
                  top: 0,
                  zIndex: 0,
                  boxShadow: "0 8px 48px 0 rgba(200,200,255,0.18)",
                }}
                aria-hidden="true"
              />
              {/* Empty center (cutout) */}
              <div
                className="bg-transparent"
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  position: "absolute",
                  left: (WHEEL_DIAMETER - 140) / 2,
                  top: (WHEEL_DIAMETER - 140) / 2,
                  zIndex: 1,
                }}
                aria-hidden="true"
              />
            </div>
            <div
              className="relative"
              style={{ width: WHEEL_DIAMETER, height: WHEEL_DIAMETER }}
            >
              <svg
                width={WHEEL_DIAMETER}
                height={WHEEL_DIAMETER}
                viewBox={`0 0 ${WHEEL_DIAMETER} ${WHEEL_DIAMETER}`}
              >
                {services.map((_, index) => {
                  const isHighlighted =
                    (isOpen && hoveredIndex === index) ||
                    (isFinalSelection && selectedIndex === index);
                  const isVisible =
                    isOpen || (isFinalSelection && selectedIndex === index);
                  return (
                    <g
                      key={index}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transition: "opacity 150ms",
                      }}
                    >
                      <path
                        d={describeArc(
                          RADIUS,
                          RADIUS,
                          RADIUS - 10,
                          index * SECTOR_SIZE,
                          (index + 1) * SECTOR_SIZE
                        )}
                        fill="none"
                        stroke={
                          isHighlighted ? "#e53935" : "rgba(255,255,255,0.25)"
                        }
                        strokeWidth={isHighlighted ? 16 : 10}
                        className={isHighlighted ? "glass-neon-border" : ""}
                        style={{
                          filter: isHighlighted
                            ? "drop-shadow(0 0 20px #e53935)"
                            : undefined,
                          transition:
                            "stroke 0.2s, filter 0.2s, stroke-width 0.2s",
                        }}
                      />
                    </g>
                  );
                })}
              </svg>
              {services.map((service, index) => {
                const angle = SECTOR_SIZE * index + SECTOR_SIZE / 2;
                const { x, y } = polarToCartesian(
                  RADIUS,
                  RADIUS,
                  RADIUS * 0.7,
                  angle
                );
                const isHighlighted =
                  (isOpen && hoveredIndex === index) ||
                  (isFinalSelection && selectedIndex === index);
                const isVisible =
                  isOpen || (isFinalSelection && selectedIndex === index);
                return (
                  <div
                    key={index}
                    className="absolute flex flex-col items-center pointer-events-none"
                    style={{
                      top: y,
                      left: x,
                      transform: "translate(-50%, -50%)",
                      transition: "color 150ms, opacity 150ms",
                      opacity: isVisible ? 1 : 0,
                    }}
                  >
                    <service.icon
                      className="mb-1"
                      size={32}
                      strokeWidth={isHighlighted ? 2 : 1.5}
                      color={isHighlighted ? "#E53935" : "#ffffff"}
                    />
                    <span style={{ color: isHighlighted ? "#E53935" : "#ffffff" }}>
                      {service.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HeroWheel;
