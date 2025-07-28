"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Home, Menu, X, Briefcase, Calendar, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

const navTabs = [
  { name: "Home", href: "/", icon: Home },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Contact Us", href: "/services", icon: Mail },
];

const FloatingNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    if (tab.name === "Contact Us") {
      e.preventDefault();
      if (pathname !== "/") {
        router.push("/services");
      } else {
        const el = document.getElementById("service-form");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          setActiveHash("#service-form");
        }
      }
    }
    setIsMobileMenuOpen(false); // Close menu on navigation
  };

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-4 right-4 z-[101]">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileMenuOpen(true)}
          className="glass-panel p-3 rounded-full"
        >
          <Menu className="h-6 w-6 text-white" />
        </motion.button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg"
          >
            <div className="flex justify-end p-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3"
              >
                <X className="h-8 w-8 text-white" />
              </motion.button>
            </div>
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navTabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  onClick={handleTabClick(tab)}
                  className="text-3xl font-semibold text-white flex items-center gap-4"
                >
                  <tab.icon className="h-8 w-8" />
                  {tab.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Top Navbar */}
      <nav className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-[100] justify-center">
        <div className="glass-panel flex items-center gap-2 px-3 py-2 rounded-full shadow-lg">
          {navTabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                onClick={handleTabClick(tab)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-red-600 rounded-full"
                    style={{ borderRadius: 9999 }}
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
