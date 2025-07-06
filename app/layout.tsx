import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import BackgroundSelector from "../components/BackgroundSelector";
import FloatingNavbar from "../components/ui/FloatingNavbar";
import TopLeftLogo from "../components/ui/TopRightLogo";
import ThemeToggle from "../components/ui/ThemeToggle";
import "./globals.css";

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
              
              // Theme management
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
      </head>
      <body
        className={inter.className + " font-body text-black bg-white dark:text-white dark:bg-dark-bg"}
        style={{ position: "relative", minHeight: "100vh" }}
      >
        <Toaster 
          position="bottom-center" 
          toastOptions={{
            style: {
              background: 'var(--toast-bg, #1a1a1a)',
              color: 'var(--toast-color, #ffffff)',
              border: '1px solid var(--toast-border, #2a2a2a)',
            },
          }}
        />
        <BackgroundSelector />
        <TopLeftLogo />
        <FloatingNavbar />
        <ThemeToggle />
        <div className="relative z-[1]">{children}</div>
      </body>
    </html>
  );
}
