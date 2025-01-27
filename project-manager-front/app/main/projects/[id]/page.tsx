"use client";
import ProjectDetailActions from "@/components/projects/Details/ProjectDetailActions";
import TaskListByProject from "@/components/tasks/TaskListByProject";
import { useParams } from "next/navigation";

export default function ProjectInfoPage() {
  const { id } = useParams();
  return (
    <div className="flex w-full flex-col">
      <ProjectDetailActions />
      {id && <TaskListByProject projectId={Number(id)} />}
    </div>
  );
}
