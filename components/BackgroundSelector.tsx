'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import BackgroundParticles from './BackgroundParticles';
import ParticleBackground from './ParticleBackground';

type BackgroundType = 'tedx' | 'classic' | 'none';

const BackgroundSelector = () => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const background = useMemo<BackgroundType>(() => {
    if (pathname === '/' || pathname.startsWith('/portfolio')) {
      return 'tedx';
    }
    return 'classic';
  }, [pathname]);

  return (
    <>
      {isClient && background === 'tedx' && <BackgroundParticles />}
      {isClient && background === 'classic' && <ParticleBackground />}
    </>
  );
};

export default BackgroundSelector;
