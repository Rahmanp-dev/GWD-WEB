import { Inter } from "next/font/google";
import ToastProvider from "@/components/ToastProvider";
import SmoothCursor from "@/components/ui/smooth-cursor";
import BackgroundSelector from "@/components/BackgroundSelector";
import TopRightLogo from "@/components/ui/TopRightLogo";
import FloatingNavbar from "@/components/ui/FloatingNavbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LGWD",
  description: "Let's Get Work Done - Freelancing Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
              })();
            `,
          }}
        />
      </head>
      <body
        className={inter.className + " font-body text-white bg-dark-bg"}
        style={{ position: "relative", minHeight: "100vh" }}
      >
        <SmoothCursor />
        <ToastProvider />
        <BackgroundSelector />
        <TopRightLogo />
        <FloatingNavbar />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
