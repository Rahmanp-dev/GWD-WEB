import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BackgroundSelector from "../components/BackgroundSelector";
import Footer from "../components/Footer";
import ToastProvider from "../components/ToastProvider";
import FloatingNavbar from "../components/ui/FloatingNavbar";
import TopLeftLogo from "../components/ui/TopRightLogo";
import dynamic from "next/dynamic";

import "./globals.css";

const SmoothCursor = dynamic(() => import("../components/ui/smooth-cursor").then(mod => mod.SmoothCursor), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GWD Global - Freelancer Weapon Wheel",
  description:
    "Professional services for web development, app development, marketing, and 3D & motion design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-body text-black dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress SES warnings in console
              const originalWarn = console.warn;
              console.warn = function(...args) {
                const message = args.join(' ');
                if (message.includes('dateTaming') || 
                    message.includes('mathTaming') || 
                    message.includes('unpermitted intrinsics')) {
                  return;
                }
                originalWarn.apply(console, args);
              };
              
              // Debug background loading
              console.log('Layout: BackgroundSelector should be loading...');
              
              // Force dark mode
              (function() {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
              })();
            `,
          }}
        />
      </head>
      <body
        className={inter.className + " font-body text-black bg-white dark:text-white dark:bg-dark-bg"}
        style={{ position: "relative", minHeight: "100vh" }}
      >
        <SmoothCursor />
        <ToastProvider />
        <BackgroundSelector />
        <TopLeftLogo />
        <FloatingNavbar />

        <div className="relative z-[1]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
