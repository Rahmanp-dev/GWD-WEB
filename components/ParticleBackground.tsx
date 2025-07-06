"use client";
// @ts-ignore
import { useCallback, useMemo } from "react";
// @ts-ignore
import Particles from "react-tsparticles";
// @ts-ignore
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {}, []);

  const options: any = useMemo(
    () => ({
      background: {
        color: {
          value: "#ffffff",
        },
      },
      fpsLimit: 60,
      particles: {
        number: {
          value: 160,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#000000",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
          },
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <Particles
      id="classic-particles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default ParticleBackground;
