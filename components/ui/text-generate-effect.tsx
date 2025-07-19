import React, { useEffect, useState } from "react";

export function TextGenerateEffect({ words, className = "" }: { words: string; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(words.slice(0, i + 1));
      i++;
      if (i >= words.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [words]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <span className={`whitespace-pre-wrap ${className}`}>{displayed}{showCursor && <span className="text-red-500">|</span>}</span>
  );
} 