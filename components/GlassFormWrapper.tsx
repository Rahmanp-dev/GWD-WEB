import React from "react";

export function GlassFormWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl p-6 md:p-10 ${className}`}
    >
      {children}
    </div>
  );
} 