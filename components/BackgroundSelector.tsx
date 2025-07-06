"use client";

import { useState } from "react";
import BackgroundParticles from "./BackgroundParticles";
import ParticleBackground from "./ParticleBackground";

type BackgroundType = "tedx" | "classic";

const BackgroundSelector = () => {
  const [background, setBackground] = useState<BackgroundType>("tedx");

  return (
    <>
      {background === "tedx" && <BackgroundParticles />}
      {background === "classic" && <ParticleBackground />}
    </>
  );
};

export default BackgroundSelector;
