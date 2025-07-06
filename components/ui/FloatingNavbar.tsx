"use client";

import { motion } from "framer-motion";
import { Bookmark, GitFork, Home, PlusSquare, Terminal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

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

const navTabs = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact Us", href: "#contact" },
];

const FloatingNavbar = () => {
  const [activeHash, setActiveHash] = useState("#about");
  const router = useRouter();
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";

  useEffect(() => {
    const onHashChange = () => {
      setActiveHash(window.location.hash || "#about");
    };
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleTabClick = (tab: { name: string; href: string }) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (tab.name === "Services") {
      e.preventDefault();
      if (pathname !== "/") {
        router.push("/#service-form");
      } else {
        const el = document.getElementById("service-form");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          setActiveHash("#service-form");
        }
      }
    }
  };

  return (
    <nav className="fixed top-8 left-0 right-0 z-[100] flex justify-center">
      <div className="navbar-glass flex items-center gap-1 px-2 py-1 z-[101]">
        {navTabs.map((tab) => {
          const isActive = activeHash === tab.href;
          return (
            <a
              key={tab.name}
              href={tab.href}
              className={`navbar-tab${isActive ? " active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              style={{ minWidth: 120, textAlign: "center", margin: "0 0.25rem" }}
              onClick={tab.name === "Services" ? handleTabClick(tab) : undefined}
            >
              {tab.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default FloatingNavbar;
