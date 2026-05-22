import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Study Planner - Professional Dashboard",
  description: "A professional productivity dashboard for managing tasks, study sessions, focus time, and analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Sidebar />
        <Navbar />
        <main className="fixed top-20 left-64 right-0 bottom-0 overflow-y-auto transition-all duration-300 lg:left-64 md:left-20 sm:left-0 md:top-20">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 pb-20">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
