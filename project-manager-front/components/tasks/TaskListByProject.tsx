"use client";
import { useTask } from "@/hooks/tasks/useTask";
import { useTaskStore } from "@/stores/task.store";
import useStore from "@/stores/useStore";
import { TaskEstatusEnum } from "@/types/tasks/create-task.dto";
import { Tab, Tabs } from "@heroui/tabs";
import { useEffect, useState } from "react";
import TaskList from "./TaskToDo";
import { TaskDto } from "@/types/tasks/task.dto";

interface TaskListByProjectProps {
  projectId: number;
}
export default function TaskListByProject({
  projectId,
}: TaskListByProjectProps) {
  const { getAllByProject } = useTask();
  const tasks = useStore(useTaskStore, (state) => state.tasks);
  const [tasksByProject, setTasksByProject] = useState<TaskDto[]>([]);

  useEffect(() => {
    getAllByProject(projectId);
  }, [projectId]);

  useEffect(() => {
    const groupedTasks = tasks?.reduce(
      (acc, task) => {
        if (!acc[task.projectId]) {
          acc[task.projectId] = [];
        }
        acc[task.projectId].push(task);
        return acc;
      },
      {} as Record<number, TaskDto[]>
    );

    // Filtrar las tareas para el projectId actual
    if (groupedTasks && groupedTasks[projectId]) {
      setTasksByProject(groupedTasks[projectId]);
    }
  }, [tasks, projectId]);

  return (
    <div className="flex w-full flex-col px-4 my-2">
      <TaskList tasks={tasksByProject || []} />
    </div>
  );
}
