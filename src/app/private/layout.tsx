"use client";
import { Outfit } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { SidebarProvider } from "../context/SidebarContext";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      
      <SidebarProvider>
        <div className={outfit.className + " dark:bg-gray-900"}>{children}</div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
