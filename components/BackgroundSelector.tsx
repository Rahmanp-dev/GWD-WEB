"use client";

import { useState, useEffect } from "react";
import BackgroundParticles from "./BackgroundParticles";
import ParticleBackground from "./ParticleBackground";

type BackgroundType = "tedx" | "classic";

const BackgroundSelector = () => {
  const [background, setBackground] = useState<BackgroundType>("tedx");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && background === "tedx" && <BackgroundParticles />}
      {isClient && background === "classic" && <ParticleBackground />}
    </>
  );
};

export default BackgroundSelector;
