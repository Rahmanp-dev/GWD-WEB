import React from "react";

interface SpotlightProps {}

export const Spotlight: React.FC<SpotlightProps> = ({}) => {
  return (
    <div
      className={
        `pointer-events-none absolute inset-0 z-0 transition-all duration-1000 animate-spotlight` +
        ` bg-[radial-gradient(ellipse_at_center,theme(colors.red-500),theme(colors.red-900)_80%)]`
      }
      style={{
        opacity: 0.7,
        filter: "blur(32px)",
        mixBlendMode: "lighten",
        animation: "spotlightMove 8s ease-in-out infinite alternate",
      }}
    />
  );
};
