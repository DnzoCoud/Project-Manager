import Navbar from "@/components/main/Navbar/Navbar";
import Sidebar from "@/components/main/Sidebar";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="w-screen h-screen flex ">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
