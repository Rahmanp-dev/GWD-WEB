"use client";

import { usePathname } from "next/navigation";
import BackgroundParticles from "@/components/BackgroundParticles";
import Sidebar from "@/components/ui/Sidebar";
import Topbar from "@/components/ui/Topbar";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className="flex h-screen font-sans">
      <BackgroundParticles />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 pt-6 flex justify-between items-center">
          <Topbar />
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full glass-panel p-6"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
