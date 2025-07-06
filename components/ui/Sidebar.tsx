"use client";

import { motion } from "framer-motion";
import {
  BarChart2,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Mail,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/inquiries", icon: Mail, label: "Inquiries" },
  { href: "/admin/projects", icon: Briefcase, label: "Projects" },
  { href: "/admin/clients", icon: Users, label: "Clients" },
  { href: "/admin/analytics", icon: BarChart2, label: "Analytics" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

const portfolioDomains = [
  { href: "/admin/portfolio/web", label: "Web" },
  { href: "/admin/portfolio/3d", label: "3D Animation" },
  { href: "/admin/portfolio/security", label: "Security" },
  { href: "/admin/portfolio/video", label: "Video Editing" },
  { href: "/admin/portfolio/mobile", label: "Mobile" },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 dark:bg-white/10 shadow-lg flex flex-col h-screen relative border-r border-gray-200 dark:border-white/20 backdrop-blur-md"
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200 dark:border-white/20">
        {!isCollapsed && <span className="font-bold text-2xl text-black dark:text-white">GWD</span>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 text-black dark:text-white"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} legacyBehavior>
            <a
              className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400
                ${
                  pathname?.startsWith(item.href)
                    ? "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 border-l-4 border-red-500"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-red-500/30 hover:text-red-700 dark:hover:text-red-200 hover:scale-[1.04] hover:shadow-lg border-l-4 border-transparent hover:border-red-400"
                }
              `}
            >
              <item.icon className="mr-4 h-6 w-6" />
              {item.label}
            </a>
          </Link>
        ))}
        <div className="mt-6">
                  <div className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
          Portfolio CMS
        </div>
          <div className="space-y-1">
            {portfolioDomains.map((domain) => (
              <Link key={domain.href} href={domain.href} legacyBehavior>
                <a
                  className={`block px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400
                    ${
                      pathname?.startsWith(domain.href)
                        ? "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 border-l-4 border-red-500"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-red-500/30 hover:text-red-700 dark:hover:text-red-200 hover:scale-[1.04] hover:shadow-lg border-l-4 border-transparent hover:border-red-400"
                    }
                  `}
                >
                  {domain.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
