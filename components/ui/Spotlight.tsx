import React from "react";

interface SpotlightProps {
  colorFrom?: string;
  colorTo?: string;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  colorFrom = "red-500",
  colorTo = "red-900",
}) => {
  // Use tailwind color classes for the gradient, fallback to red theme
  // Animate the gradient position for a subtle moving effect
  return (
    <div
      className={
        `pointer-events-none absolute inset-0 z-0 transition-all duration-1000 animate-spotlight` +
        ` bg-[radial-gradient(ellipse_at_center,theme(colors.${colorFrom}),theme(colors.${colorTo})_80%)]`
      }
      style={{
        opacity: 0.7,
        filter: "blur(32px)",
        mixBlendMode: "lighten",
        animation: "spotlightMove 8s ease-in-out infinite alternate"
      }}
    />
  );
};

// Add spotlightMove keyframes globally if not already present
// @layer utilities {
//   @keyframes spotlightMove {
//     0% { transform: translateY(0) translateX(0) scale(1); }
//     100% { transform: translateY(-20px) translateX(30px) scale(1.05); }
//   }
//   .animate-spotlight { animation: spotlightMove 8s ease-in-out infinite alternate; }
// } 