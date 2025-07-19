import React from "react";
import { motion } from "framer-motion";

const techGroups = [
  {
    title: "WEB DEVELOPMENT",
    description: "Modern, scalable, and beautiful web apps.\nReact, Next.js, TypeScript, Node.js, MongoDB, and more.",
    icons: [
      { name: "React", src: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/000000" },
      { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "JavaScript", src: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "Node.js", src: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "Express", src: "https://cdn.simpleicons.org/express/000000" },
      { name: "MongoDB", src: "https://cdn.simpleicons.org/mongodb/47A248" },
    ],
  },
  {
    title: "MOBILE APP DEVELOPMENT",
    description: "Cross-platform mobile experiences.\nFlutter, React Native, Kotlin, Android Studio, Firebase.",
    icons: [
      { name: "Flutter", src: "https://cdn.simpleicons.org/flutter/02569B" },
      { name: "React Native", src: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Kotlin", src: "https://cdn.simpleicons.org/kotlin/7F52FF" },
      { name: "Android Studio", src: "https://cdn.simpleicons.org/androidstudio/3DDC84" },
      { name: "Firebase", src: "https://cdn.simpleicons.org/firebase/FFCA28" },
    ],
  },
  {
    title: "3D & DESIGN",
    description: "Immersive 3D, design, and animation.\nBlender, Figma, Illustrator, XD, Photoshop.",
    icons: [
      { name: "Blender", src: "https://cdn.simpleicons.org/blender/F5792A" },
      { name: "Figma", src: "https://cdn.simpleicons.org/figma/F24E1E" },
      { name: "Illustrator", src: "https://cdn.simpleicons.org/adobeillustrator/FF9A00" },
      { name: "XD", src: "https://cdn.simpleicons.org/adobexd/FF61F6" },
      { name: "Photoshop", src: "https://cdn.simpleicons.org/adobephotoshop/31A8FF" },
    ],
  },
  {
    title: "VIDEO & ANIMATION",
    description: "High-quality video editing and streaming.\nAfter Effects, Premiere Pro, DaVinci Resolve, Audition.",
    icons: [
      { name: "After Effects", src: "https://cdn.simpleicons.org/adobeaftereffects/9999FF" },
      { name: "Premiere Pro", src: "https://cdn.simpleicons.org/adobepremierepro/9999FF" },
      { name: "DaVinci Resolve", src: "https://cdn.simpleicons.org/davinciresolve/FF9E2A" },
      { name: "Audition", src: "https://cdn.simpleicons.org/adobeaudition/00FFCC" },
    ],
  },
  {
    title: "SECURITY",
    description: "Secure, robust, and reliable systems.\nBurp Suite, Wireshark, Kali Linux, Metasploit.",
    icons: [
      { name: "Burp Suite", src: "https://cdn.simpleicons.org/burpsuite/FF6F00" },
      { name: "Wireshark", src: "https://cdn.simpleicons.org/wireshark/1679A7" },
      { name: "Kali Linux", src: "https://cdn.simpleicons.org/kalilinux/557C94" },
      { name: "Metasploit", src: "https://cdn.simpleicons.org/metasploit/157DC3" },
    ],
  },
];

const iconVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      type: "spring",
      stiffness: 320,
      damping: 24,
    },
  }),
};

export function TechStackShowcase() {
  return (
    <section className="w-full py-16 px-6 bg-gradient-to-b from-black to-zinc-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-12 text-center tracking-tight font-mono uppercase">
          Tech Stack Showcase
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {techGroups.map((group, idx) => (
            <motion.div
              key={group.title}
              className="rounded-2xl bg-black/70 shadow-md border border-white/10 p-8 flex flex-col items-center group hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.35)" }}
            >
              <h3 className="text-lg md:text-xl font-mono font-bold uppercase text-white tracking-wider mb-2 text-center">
                {group.title}
              </h3>
              <p className="text-sm text-neutral-300 text-center mb-6 whitespace-pre-line">
                {group.description}
              </p>
              <motion.div
                className="flex flex-wrap justify-center gap-4 mt-2"
                initial="hidden"
                whileHover="visible"
                animate="visible"
                variants={{}}
              >
                {group.icons.map((icon, i) => (
                  <motion.img
                    key={icon.name}
                    src={icon.src}
                    alt={icon.name}
                    title={icon.name}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-xl bg-white/5 p-2 shadow-sm border border-white/10 transition-transform duration-200 group-hover:scale-110"
                    custom={i}
                    variants={iconVariants}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 