"use client";
import React from "react";
import ProfileInfo from "./ProfileInfo";
import { useStore } from "zustand";
import { useSidebarStore } from "@/stores/main/useSidebarStore";
import { Button } from "@heroui/button";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiSun } from "react-icons/ci";
import { useTheme } from "next-themes";

export default function Navbar() {
  const activeLink = useStore(useSidebarStore, (state) => state.activeLink);
  const { theme, setTheme } = useTheme();
  return (
    <header className="border-b dark:border-slate-700 h-14 p-1 flex items-center w-full justify-between px-4">
      {activeLink && (
        <span className="font-extrabold text-xl">{activeLink.label}</span>
      )}
      {!activeLink && (
        <span className="font-extrabold text-xl">Project Manager App</span>
      )}
      <div className="flex items-center gap-4">
        <div className="flex items-center ">
          <Button
            isIconOnly
            variant={theme !== "light" ? "ghost" : "solid"}
            color="warning"
            onPress={() => setTheme("light")}
            size="sm"
            className="rounded-r-none"
          >
            <CiSun className="text-2xl" />
          </Button>
          <Button
            isIconOnly
            variant={theme !== "dark" ? "ghost" : "solid"}
            color="secondary"
            onPress={() => setTheme("dark")}
            size="sm"
            className="rounded-l-none"
          >
            <MdOutlineDarkMode className="text-2xl" />
          </Button>
        </div>
        <ProfileInfo />
      </div>
    </header>
  );
}
