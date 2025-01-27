"use client";
import ProjectDetailActions from "@/components/projects/Details/ProjectDetailActions";
import TaskListByProject from "@/components/tasks/TaskListByProject";
import { useProjectStore } from "@/stores/project.store";
import { ProjectDto } from "@/types/projects/project.dto";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectInfoPage() {
  const { id } = useParams();
  const [actualProject, setActualProject] = useState<ProjectDto | null>(null);
  const { projects } = useProjectStore();
  useEffect(() => {
    const project = projects.find((project) => project.id === Number(id));
    if (project) setActualProject(project);
  }, [id]);
  return (
    <div className="flex w-full flex-col">
      {actualProject && (
        <div className="p-4">
          <h1 className="text-5xl font-extrabold">{actualProject.name}</h1>
          <p className="text-muted-foreground">{actualProject.description}</p>
        </div>
      )}
      <ProjectDetailActions />
      {id && <TaskListByProject projectId={Number(id)} />}
    </div>
  );
}
