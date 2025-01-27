"use client";
import { useProject } from "@/hooks/projects/useProject";
import React, { useEffect } from "react";
import ProjectCard, { ProjectCardSkeleton } from "./ProjectCard";
import { useStore } from "zustand";
import { useProjectStore } from "@/stores/project.store";

export default function ProjectList() {
  const { getAllProjects, loading } = useProject();
  const projects = useStore(useProjectStore, (state) => state.projects);
  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="w-full grid grid-cols-8 gap-2 px-4">
      <div className="col-span-8">
        <h1 className="font-extrabold text-5xl bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Listado de Proyectos
        </h1>
      </div>
      {loading && <ProjectCardSkeleton />}
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          className="col-span-2"
        />
      ))}
    </div>
  );
}
