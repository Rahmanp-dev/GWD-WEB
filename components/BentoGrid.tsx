import React from "react";

export function BentoGrid({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  title,
  description,
  header,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}: {
  title: string;
  description: string;
  header?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}) {
  return (
    <div
      className={`rounded-2xl p-8 flex flex-col items-center justify-center bg-[rgba(40,40,60,0.7)] backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_0_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-[1.03] hover:backdrop-blur-2xl hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] hover:border-white/20 ${className}`.trim()}
    >
      {header && <div className="mb-4 w-full flex justify-center">{header}</div>}
      <h3 className={`text-2xl font-bold text-white drop-shadow-md text-center ${titleClassName}`}>{title}</h3>
      <p className={`text-base text-neutral-300 text-center ${descriptionClassName}`}>{description}</p>
    </div>
  );
} 