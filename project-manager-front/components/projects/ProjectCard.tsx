import { ProjectDto } from "@/types/projects/project.dto";
import React from "react";
import { Skeleton } from "@heroui/skeleton";
import { Card } from "@heroui/card";
import { LuPackage2 } from "react-icons/lu";
import { SlOptionsVertical } from "react-icons/sl";
import { Button } from "@heroui/button";
import { GrFormNextLink } from "react-icons/gr";
import { cn } from "@/lib/class-merge.util";
import Link from "next/link";

export function ProjectCardSkeleton() {
  return (
    <Card className="w-[200px] space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
  );
}

interface ProjectCardProps {
  project: ProjectDto;
  className?: string;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Card className={cn("flex flex-col w-full relative", className)}>
      <span className="absolute right-3 top-2 size-6 flex items-center justify-center hover:bg-gray-basic rounded-full cursor-pointer">
        <SlOptionsVertical />
      </span>
      <div className="flex items-start gap-2 w-full px-4 py-2 ">
        <span className="size-8 flex items-center justify-center bg-slate-400 rounded-xl flex-shrink-0">
          <LuPackage2 className="text-white" />
        </span>
        <span>
          <h1 className="font-semibold">{project.name}</h1>
          <p className="text-xs text-muted-foreground">{project.description}</p>
        </span>
      </div>
      <Link
        href={`/main/projects/${project.id}`}
        color="success"
        className="rounded-t-none rounded-b-xl bg-green-400 p-2 text-white font-extralight text-center hover:bg-green-500 transition"
      >
        <span className="flex items-center">
          Ver Progreso
          <GrFormNextLink />
        </span>
      </Link>
    </Card>
  );
}
