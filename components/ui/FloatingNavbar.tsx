'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Home, Menu, X, Briefcase, Calendar, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

// --- Configuration ---
const navTabs = [
  { name: "Home", href: "/", icon: Home },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Contact Us", href: "/services", icon: Mail, isContact: true },
];

// --- Animation Variants ---
const mobileMenuVariant = {
  hidden: { opacity: 0, x: "100%" },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  exit: { opacity: 0, x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
};

const navListVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const navItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// --- Main Component ---
const FloatingNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceFormVisible, setIsServiceFormVisible] = useState(false);
  const pathname = usePathname();

  // Use an IntersectionObserver to track if the contact form is visible on the homepage
  useEffect(() => {
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsServiceFormVisible(entry.isIntersecting),
      { rootMargin: "-50% 0px -50% 0px" } // Trigger when the element is in the middle of the viewport
    );

    const target = document.getElementById("service-form");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [pathname]);

  // Handles click on a navigation tab
  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: (typeof navTabs)[0]) => {
    if (tab.isContact && pathname === "/") {
      e.preventDefault();
      document.getElementById("service-form")?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* --- Mobile: Menu Button --- */}
      <nav className="md:hidden fixed top-4 right-4 z-[101]">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileMenuOpen(true)}
          className="glass-panel p-3 rounded-full"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-white" />
        </motion.button>
      </nav>

      {/* --- Mobile: Menu Overlay --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg"
          >
            <div className="flex justify-end p-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3"
                aria-label="Close menu"
              >
                <X className="h-8 w-8 text-white" />
              </motion.button>
            </div>
            <motion.div
              variants={navListVariant}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center h-full space-y-8 -mt-16"
            >
              {navTabs.map((tab) => {
                const isActive = (pathname === tab.href && !isServiceFormVisible) || (tab.isContact && isServiceFormVisible);
                return (
                  <motion.div key={tab.name} variants={navItemVariant}>
                    <Link
                      href={tab.href}
                      onClick={(e) => handleTabClick(e, tab)}
                      className={`text-3xl font-semibold flex items-center gap-4 transition-colors ${
                        isActive ? "text-red-400" : "text-white"
                      }`}
                    >
                      <tab.icon className="h-8 w-8" />
                      {tab.name}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Desktop: Navbar --- */}
      <nav className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-[100] justify-center">
        <div className="glass-panel flex items-center gap-2 px-3 py-2 rounded-full shadow-lg">
          {navTabs.map((tab) => {
            // Determine if the tab is active
            const isActive = (pathname === tab.href && !isServiceFormVisible) || (tab.isContact && pathname === "/" && isServiceFormVisible) || (tab.isContact && pathname === "/services");

            return (
              <Link
                key={tab.name}
                href={tab.href}
                onClick={(e) => handleTabClick(e, tab)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-red-600 rounded-full"
                    transition={{ duration: 0.6, type: "spring", bounce: 0.2, stiffness: 100 }}
                  />
                )}
                <span className="relative z-10">{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default FloatingNavbar;
