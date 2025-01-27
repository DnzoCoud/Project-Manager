"use client"
import { cn } from "@/lib/class-merge.util";
import { useSidebarStore } from "@/stores/main/useSidebarStore";
import useStore from "@/stores/useStore";
import React from "react";

export default function Sidebar() {
  const isSidebarOpen = useStore(useSidebarStore, (state) => state.isOpen);
  return <aside className={cn(
    isSidebarOpen ? "w-72" : "w-14",
    "flex flex-col"
  )}>sadsa</aside>;
}
