"use client";

import React, { ReactNode, useLayoutEffect, useRef, useCallback } from "react";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full h-auto p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border will-change-transform ${itemClassName}`.trim()}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemScale?: number;
  stackPosition?: string;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemScale = 0.05,
  stackPosition = "10vh",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  const updateCardTransforms = useCallback(() => {
    const container = containerRef.current;
    if (!container || !cardsRef.current.length) return;

    const scrollTop = window.scrollY;
    const containerTop = container.offsetTop;
    const containerHeight = container.clientHeight;
    const windowHeight = window.innerHeight;

    cardsRef.current.forEach((card, i) => {
      const cardHeight = card.clientHeight;
      const cardTop = card.offsetTop + containerTop;
      
      // Calculate the progress of the card moving towards its final stacked position
      const start = cardTop - windowHeight;
      const end = containerTop;
      const progress = Math.max(0, Math.min(1, (scrollTop - start) / (end - start)));

      // The scale of the card decreases as it gets "further away" in the stack
      const scale = 1 - (cardsRef.current.length - 1 - i) * itemScale * progress;
      
      card.style.transform = `scale(${scale})`;
    });
  }, [itemScale]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll(".scroll-stack-card")) as HTMLElement[];
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      card.style.position = 'sticky';
      card.style.top = `calc(${stackPosition} + ${i * 20}px)`;
      card.style.zIndex = `${i + 1}`;
    });

    const handleScroll = () => requestAnimationFrame(updateCardTransforms);
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial update
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [stackPosition, updateCardTransforms]);

  return (
    <div
      className={`relative w-full ${className}`.trim()}
      ref={containerRef}
    >
      {children}
    </div>
  );
};

export default ScrollStack;