import Link from "next/link";
import React from "react";
import { GoProjectRoadmap } from "react-icons/go";
import { Tooltip } from "@heroui/tooltip";
import { cn } from "@/lib/class-merge.util";
import { useActiveLink } from "@/hooks/useActiveLink";

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

  return (
    <Tooltip content={label} placement="right">
      <li
        className={cn(
          "size-9 rounded-xl group active:bg-gray-300 transition-all",
          isActive && "bg-gray-basic"
        )}
      >
        <Link
          href={path}
          className="size-full flex items-center justify-center"
        >
          {icon ? (
            <>
              {React.cloneElement(icon, {
                className: cn(
                  "text-2xl text-muted-foreground group-hover:text-black",
                  iconClassName,
                  isActive && "text-black"
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
