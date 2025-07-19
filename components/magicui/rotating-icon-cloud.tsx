import React from "react";

export function RotatingIconCloud({ icons, size = 240, iconSize = 48 }: { icons: string[]; size?: number; iconSize?: number }) {
  // CSS keyframes for rotation
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <style>{`
        @keyframes rotateCloud {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div
        className="absolute inset-0"
        style={{
          width: size,
          height: size,
          animation: "rotateCloud 18s linear infinite",
        }}
      >
        {icons.map((icon, idx) => {
          const angle = (2 * Math.PI * idx) / icons.length;
          const r = size / 2 - iconSize / 2 - 8;
          const x = r * Math.cos(angle) + size / 2 - iconSize / 2;
          const y = r * Math.sin(angle) + size / 2 - iconSize / 2;
          return (
            <img
              key={icon + idx}
              src={icon}
              alt="tech icon"
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: iconSize,
                height: iconSize,
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.25))",
                zIndex: 2,
                transition: "transform 0.2s",
              }}
            />
          );
        })}
      </div>
    </div>
  );
} 