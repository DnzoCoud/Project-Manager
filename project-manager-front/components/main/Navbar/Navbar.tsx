"use client";
import React from "react";
import ProfileInfo from "./ProfileInfo";
import { useStore } from "zustand";
import { useSidebarStore } from "@/stores/main/useSidebarStore";

export default function Navbar() {
  const activeLink = useStore(useSidebarStore, (state) => state.activeLink);
  return (
    <header className="border-b dark:border-slate-700 h-14 p-1 flex items-center w-full justify-between px-4">
      {activeLink && (
        <span className="font-extrabold text-xl">{activeLink.label}</span>
      )}
      <ProfileInfo />
    </header>
  );
}
