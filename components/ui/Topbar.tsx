"use client";

import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const getTitleFromPath = (path: string) => {
  const segment = path.split("/").pop() || "dashboard";
  return segment.charAt(0).toUpperCase() + segment.slice(1);
};

const Topbar = () => {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname || "");

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b h-16">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center space-x-3">
        <span className="text-gray-600 font-medium">Admin User</span>
        <div className="relative">
          <button className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <ChevronDown size={16} />
          </button>
          {/* Dropdown menu can be added here */}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
