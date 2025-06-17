import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar"; // Import your Sidebar component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DashUI - Simple Dashboard SaaS",
  description: "A simple dashboard SaaS website built with Next.js and Shadcn UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <Sidebar /> {/* Add the sidebar here */}
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14"> {/* This padding ensures content doesn't go under sidebar */}
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}