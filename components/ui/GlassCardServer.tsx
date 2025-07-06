import { ReactNode } from "react";

interface GlassCardServerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function GlassCardServer({
  children,
  className,
  style,
}: GlassCardServerProps) {
  return (
    <div className={`glass-panel ${className ?? ""}`} style={style}>
      {children}
    </div>
  );
}
