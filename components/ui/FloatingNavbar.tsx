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
        <item.icon className="h-6 w-6 text-black transition-colors duration-300 group-hover:text-red-700" />
      </motion.div>
    </div>
  </Link>
);

const navTabs = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Events", href: "/events" },
  { name: "Contact Us", href: "/services" },
];

const FloatingNavbar = () => {
  const [activeHash, setActiveHash] = useState("");
  const router = useRouter();
  const rawPathname = usePathname();
  const pathname = typeof rawPathname === 'string' ? rawPathname : '/';

  useEffect(() => {
    const onHashChange = () => {
      setActiveHash(window.location.hash || "");
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
    <>
      {/* Mobile Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center md:hidden px-2 pb-2">
        <div className="glass-panel flex items-center gap-1 px-2 py-1 z-[101] border border-white/10 bg-black/40 backdrop-blur-xl w-full max-w-md rounded-2xl overflow-x-auto scrollbar-hide shadow-md mx-2">
          {navTabs.map((tab) => {
            let isActive = false;
            if (tab.href.startsWith("#")) {
              isActive = activeHash === tab.href;
            } else if (tab.href === "/") {
              isActive = pathname === "/";
            } else {
              isActive = pathname.startsWith(tab.href);
            }
            return (
              <a
                key={tab.name}
                href={tab.href}
                className={`navbar-tab group relative transition-colors duration-200 whitespace-nowrap text-sm px-3 py-2${isActive ? " active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                style={{ minWidth: 100, textAlign: "center", margin: "0 0.15rem" }}
                onClick={tab.name === "Services" ? handleTabClick(tab) : undefined}
              >
                {tab.name}
              </a>
            );
          })}
        </div>
      </nav>
      {/* Desktop Top Navbar */}
      <nav className="hidden md:flex fixed top-4 left-0 right-0 z-[100] justify-center px-4">
        <div className="glass-panel flex items-center gap-0 px-2 py-1 z-[101] border border-white/10 bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg">
          {navTabs.map((tab) => {
            let isActive = false;
            if (tab.href.startsWith("#")) {
              isActive = activeHash === tab.href;
            } else if (tab.href === "/") {
              isActive = pathname === "/";
            } else {
              isActive = pathname.startsWith(tab.href);
            }
            return (
              <a
                key={tab.name}
                href={tab.href}
                className={`navbar-tab group relative transition-colors duration-200 whitespace-nowrap text-sm px-4 py-2${isActive ? " active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                style={{ minWidth: 80, textAlign: "center" }}
                onClick={tab.name === "Services" ? handleTabClick(tab) : undefined}
              >
                {tab.name}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default FloatingNavbar;
