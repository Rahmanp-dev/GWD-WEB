import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { CanvasRevealEffect } from "@/components/ui/CanvasRevealEffect";
import { ExpertiseTabs } from "@/components/ExpertiseTabs";

// Top icons of each domain
const slugs = [
  // Web
  "react", "nextdotjs", "nodedotjs", "typescript", "tailwindcss",
  // Mobile
  "flutter", "firebase", "androidstudio",
  // Game Dev
  "unity", "unrealengine", "blender",
  // DevOps
  "docker", "kubernetes", "amazonaws",
  // 3D & Animation
  "blender", "figma", "adobeaftereffects",
  // Video & VFX
  "adobepremierepro", "finalcutpro", "davinciresolve",
  // Cyber Security
  "kalilinux", "wireshark", "burpsuite"
];
const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);

const domainCards = [
  {
    label: "Web Development",
    icon: <img src="https://cdn.simpleicons.org/react/61DAFB" alt="Web" className="w-12 h-12" />,
    color: "from-blue-500 to-cyan-500",
    stack: [
      "HTML, CSS, JavaScript, TypeScript",
      "React, Next.js, Angular, Vue, Svelte",
      "Tailwind, Bootstrap, Sass, Chakra UI",
      "Node.js, Express.js, NestJS",
      "MongoDB, PostgreSQL, MySQL, Supabase, Prisma, Firebase",
      "GraphQL, REST APIs",
      "Vite, Webpack, Babel",
      "Vercel, Netlify",
    ],
  },
  {
    label: "Mobile Development",
    icon: <img src="https://cdn.simpleicons.org/flutter/02569B" alt="Mobile" className="w-12 h-12" />,
    color: "from-fuchsia-500 to-pink-500",
    stack: [
      "Flutter, Dart",
      "React Native, Expo",
      "Swift, Kotlin, Java (Android)",
      "Firebase, Realm, AWS Amplify",
      "SQLite, Hive, GetX, Riverpod",
      "Android Studio, Xcode",
    ],
  },
  {
    label: "Game Development",
    icon: <img src="https://cdn.simpleicons.org/unity/222C37" alt="Game" className="w-12 h-12" />,
    color: "from-emerald-500 to-green-700",
    stack: [
      "Unity, Unreal Engine, Godot",
      "C#, C++, Blueprints",
      "Photon Networking, Mirror, PlayFab",
      "Blender (assets), Spine, Mixamo",
      "FMOD, Wwise (Audio)",
    ],
  },
  {
    label: "DevOps",
    icon: <img src="https://cdn.simpleicons.org/docker/2496ED" alt="DevOps" className="w-12 h-12" />,
    color: "from-sky-500 to-indigo-500",
    stack: [
      "Docker, Kubernetes, Podman",
      "Jenkins, GitHub Actions, CircleCI",
      "AWS, Azure, GCP",
      "Terraform, Ansible, Pulumi",
      "Prometheus, Grafana, Loki",
      "Vercel, Netlify, NGINX, Apache",
      "Git, GitLab, Bitbucket",
    ],
  },
  {
    label: "3D Animation & Modeling",
    icon: <img src="https://cdn.simpleicons.org/blender/F5792A" alt="3D" className="w-12 h-12" />,
    color: "from-orange-400 to-yellow-500",
    stack: [
      "Blender, Autodesk Maya, Cinema4D, 3ds Max",
      "ZBrush, Houdini, Marvelous Designer",
      "Substance Painter, Mixamo",
      "Sketchfab, Unreal Engine (cinematics)",
    ],
  },
  {
    label: "Video Editing & VFX",
    icon: <img src="https://cdn.simpleicons.org/adobeaftereffects/9999FF" alt="Video" className="w-12 h-12" />,
    color: "from-purple-500 to-indigo-700",
    stack: [
      "Adobe After Effects, Premiere Pro",
      "Final Cut Pro, DaVinci Resolve",
      "HitFilm Pro, Mocha Pro, Adobe Encoder",
      "VFX Suite, Red Giant, Boris FX, Fusion",
    ],
  },
  {
    label: "Cyber Security",
    icon: <img src="https://cdn.simpleicons.org/kalilinux/557C94" alt="Security" className="w-12 h-12" />,
    color: "from-red-500 to-rose-700",
    stack: [
      "Kali Linux, Parrot OS",
      "Burp Suite, Metasploit, Wireshark",
      "Nmap, Nessus, Hydra, JohnTheRipper",
      "OWASP ZAP, Aircrack-ng, Hashcat",
      "Splunk, SIEM tools, Firejail",
      "MITMproxy, Netcat",
    ],
  },
];

export function ExpertiseShowcase() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section id="our-expertise" className="w-full bg-transparent py-20 px-0">
      <div className="max-w-screen-xl mx-auto px-6 py-20 bg-white/5 dark:bg-zinc-900/40 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 flex flex-col items-center">
        <h2 className="text-4xl font-semibold text-white text-center mb-12">Our Expertise</h2>
        {/* Icon Cloud */}
        <div className="w-full flex items-center justify-center mb-20" style={{ minHeight: 420 }}>
          <IconCloud images={images} iconSize={36} radius={150} speed={3} />
        </div>
        {/* Domain Tabs (Modern Vertical Tabs) */}
        <ExpertiseTabs domains={domainCards} />
      </div>
    </section>
  );
}

// Plus icon for card corners
const IconPlus = ({ className = "", ...rest }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
    {...rest}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
); 