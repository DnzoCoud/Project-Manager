import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoProjectRoadmap } from "react-icons/go";
import { Tooltip } from "@heroui/tooltip";
import { cn } from "@/lib/class-merge.util";
import { useActiveLink } from "@/hooks/useActiveLink";
import { useSidebarStore } from "@/stores/main/useSidebarStore";
import { useStore } from "zustand";

export interface NavItemProps {
  label: string;
  path: string;
  icon?: React.ReactElement;
  iconClassName?: string;
}

export default function NavItem({
  label,
  icon,
  iconClassName,
  path,
}: NavItemProps) {
  const isActive = useActiveLink(path);
  const setActiveLink = useStore(
    useSidebarStore,
    (state) => state.setActiveLink
  );

  useEffect(() => {
    if (isActive) {
      setActiveLink({
        label,
        path,
        icon,
        iconClassName,
      });
    }
  }, [path, isActive]);

  return (
    <Tooltip content={label} placement="right">
      <li
        className={cn(
          "size-11 rounded-xl group active:bg-gray-300 transition-all",
          isActive && "bg-slate-800"
        )}
      >
        <Link
          href={path}
          className="size-full flex items-center justify-center"
          onClick={() => {
            setActiveLink({
              label,
              path,
              icon,
              iconClassName,
            });
          }}
        >
          {icon ? (
            <>
              {React.cloneElement(icon, {
                className: cn(
                  "text-2xl text-muted-foreground group-hover:text-black",
                  iconClassName,
                  isActive && "text-white"
                ),
              })}
            </>
          ) : (
            <GoProjectRoadmap className="text-2xl text-muted-foreground" />
          )}
        </Link>
      </li>
    </Tooltip>
  );
}
