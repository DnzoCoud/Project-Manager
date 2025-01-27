"use client";
import { cn } from "@/lib/class-merge.util";
import { useSidebarStore } from "@/stores/main/useSidebarStore";
import useStore from "@/stores/useStore";
import React from "react";
import NavItem, { NavItemProps } from "./NavItem";
import { AiOutlineProduct } from "react-icons/ai";
import { GoProjectRoadmap } from "react-icons/go";
import { FiUsers } from "react-icons/fi";

const items: NavItemProps[] = [
  {
    label: "Projects",
    icon: <GoProjectRoadmap />,
    path: "/main",
  },
  {
    label: "Users",
    icon: <FiUsers />,
    path: "/main/users",
  },
];

export default function Sidebar() {
  const isSidebarOpen = useStore(useSidebarStore, (state) => state.isOpen);
  return (
    <aside
      className={cn(
        isSidebarOpen ? "w-72" : "w-16",
        "flex flex-col justify-start items-center  transition my-6 gap-4"
      )}
    >
      <AiOutlineProduct className="text-3xl" />
      <nav className="w-full flex items-center justify-center">
        <ul className="flex flex-col items-center gap-6">
          {items.map((item, i) => (
            <NavItem
              path={item.path}
              key={`Nav_Item_${i}`}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
