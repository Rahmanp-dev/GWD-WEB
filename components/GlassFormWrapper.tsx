import React from "react";

export function GlassFormWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`glass-panel p-6 md:p-10 ${className}`}
    >
      {children}
    </div>
  );
} 