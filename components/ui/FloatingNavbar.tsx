"use client";

import { motion } from "framer-motion";
import { Bookmark, GitFork, Home, PlusSquare, Terminal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { name: "Home", icon: Home, href: "/", target: "" },
  { name: "Services", icon: Terminal, href: "/#service-form", target: "" },
  {
    name: "Add Project",
    icon: PlusSquare,
    href: "/admin/projects",
    target: "",
  },
  { name: "Portfolio", icon: GitFork, href: "/portfolio", target: "" },
  {
    name: "GitHub",
    icon: Bookmark,
    href: "https://github.com/codycora",
    target: "_blank",
  },
  { name: "Close", icon: X, href: "#", target: "" },
];

const NavItem = ({ item }: { item: (typeof navItems)[0] }) => (
  <Link href={item.href} target={item.target}>
    <div className="group relative" title={item.name}>
      <motion.div
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent transition-colors duration-300 group-hover:bg-white/20"
      >
        <item.icon className="h-6 w-6 text-black transition-colors duration-300 group-hover:text-red-500" />
      </motion.div>
    </div>
  </Link>
);

const FloatingNavbar = () => {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed bottom-8 inset-x-0 z-[100] flex justify-center"
    >
      <div className="flex items-center gap-4 rounded-full glass-panel p-3 shadow-2xl">
        {navItems.slice(0, 3).map((item) => (
          <NavItem key={item.name} item={item} />
        ))}

        <Link href="/admin">
          <motion.div
            title="Dashboard"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="group relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full glass-panel"
          >
            <Image
              src="/logo.png"
              alt="Dashboard"
              width={32}
              height={32}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>
        </Link>

        {navItems.slice(3).map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </div>
    </motion.nav>
  );
};

export default FloatingNavbar;
