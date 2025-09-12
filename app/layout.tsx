import { Inter } from "next/font/google";
import ToastProvider from "@/components/ToastProvider";
import BackgroundSelector from "@/components/BackgroundSelector";
import TopLeftLogo from "@/components/ui/TopLeftLogo";
import FloatingNavbar from "@/components/ui/FloatingNavbar";
import "./globals.css";
import dynamic from "next/dynamic";

const SmoothCursor = dynamic(() => import("@/components/ui/smooth-cursor"), {
  ssr: false,
});

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
        <TopLeftLogo />
        <FloatingNavbar />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
