import React from "react";
import ScrollStack, { ScrollStackItem } from './ui/ScrollStack';
import { IconCloud } from "@/components/magicui/icon-cloud";

const slugs = [
  "react", "nextdotjs", "nodedotjs", "typescript", "tailwindcss", "flutter", 
  "firebase", "androidstudio", "unity", "unrealengine", "blender", "docker", 
  "kubernetes", "amazonaws", "figma", "adobeaftereffects", "adobepremierepro", 
  "finalcutpro", "davinciresolve", "kalilinux", "wireshark", "burpsuite"
];

const domainCards = [
  {
    label: "Web Development",
    icon: "https://cdn.simpleicons.org/react/61DAFB",
    stack: [
      "HTML, CSS, JavaScript, TypeScript",
      "React, Next.js, Angular, Vue, Svelte",
      "Tailwind, Bootstrap, Sass, Chakra UI",
      "Node.js, Express.js, NestJS",
      "MongoDB, PostgreSQL, MySQL, Supabase, Prisma, Firebase",
      "GraphQL, REST APIs",
    ],
  },
  {
    label: "Mobile Development",
    icon: "https://cdn.simpleicons.org/flutter/02569B",
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
    icon: "https://cdn.simpleicons.org/unity/222C37",
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
    icon: "https://cdn.simpleicons.org/docker/2496ED",
    stack: [
      "Docker, Kubernetes, Podman",
      "Jenkins, GitHub Actions, CircleCI",
      "AWS, Azure, GCP",
      "Terraform, Ansible, Pulumi",
      "Prometheus, Grafana, Loki",
      "Git, GitLab, Bitbucket",
    ],
  },
  {
    label: "3D Animation & Modeling",
    icon: "https://cdn.simpleicons.org/blender/F5792A",
    stack: [
      "Blender, Autodesk Maya, Cinema4D, 3ds Max",
      "ZBrush, Houdini, Marvelous Designer",
      "Substance Painter, Mixamo",
      "Sketchfab, Unreal Engine (cinematics)",
    ],
  },
  {
    label: "Video Editing & VFX",
    icon: "https://cdn.simpleicons.org/adobeaftereffects/9999FF",
    stack: [
      "Adobe After Effects, Premiere Pro",
      "Final Cut Pro, DaVinci Resolve",
      "HitFilm Pro, Mocha Pro, Adobe Encoder",
      "VFX Suite, Red Giant, Boris FX, Fusion",
    ],
  },
  {
    label: "Cyber Security",
    icon: "https://cdn.simpleicons.org/kalilinux/557C94",
    stack: [
      "Kali Linux, Parrot OS",
      "Burp Suite, Metasploit, Wireshark",
      "Nmap, Nessus, Hydra, JohnTheRipper",
      "OWASP ZAP, Aircrack-ng, Hashcat",
      "Splunk, SIEM tools, Firejail",
    ],
  },
];

export function ExpertiseShowcase() {
  return (
    <section id="our-expertise" className="glass-panel py-20 bg-white/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/20 shadow-2xl my-16"
      aria-label="Featured Projects Carousel">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center px-4">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">Our Expertise</h2>
        <p className="text-lg md:text-xl text-[rgb(var(--foreground-muted))] mb-12">
          We master a wide array of technologies to bring your vision to life.
        </p>
        <div className="w-full h-[400px] relative">
          <IconCloud
            images={slugs.map(slug => `https://cdn.simpleicons.org/${slug}`)}
            radius={180}
            speed={4}
          />
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4">
        <ScrollStack
          itemScale={0.02}
          stackPosition="15vh"
        >
          {domainCards.map((card, index) => (
            <ScrollStackItem key={index} itemClassName="glass-panel text-white p-8 md:p-12">
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <img src={card.icon} alt={card.label} className="w-12 h-12 mr-6" />
                  <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--accent))]">{card.label}</h2>
                </div>
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-[rgb(var(--foreground-muted))]">
                  {card.stack.map((tech, i) => (
                    <p key={i} className="text-sm md:text-base">{tech}</p>
                  ))}
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}