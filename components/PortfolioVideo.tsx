"use client";
import React, { useRef } from "react";

export default function PortfolioVideo({
  src,
  poster,
  ariaLabel,
  className,
  style,
}: {
  src: string;
  poster?: string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={style}
      muted
      loop
      preload="metadata"
      poster={poster}
      aria-label={ariaLabel}
      onMouseOver={() => videoRef.current?.play()}
      onMouseOut={() => videoRef.current?.pause()}
    />
  );
}
