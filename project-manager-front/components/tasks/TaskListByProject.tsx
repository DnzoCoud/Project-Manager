"use client";
import { useTask } from "@/hooks/tasks/useTask";
import { useTaskStore } from "@/stores/task.store";
import useStore from "@/stores/useStore";
import { TaskDto } from "@/types/tasks/task.dto";
import { useEffect, useState } from "react";
import TaskList from "./TaskToDo";
import { TaskEstatusEnum } from "@/types/tasks/create-task.dto";

interface TaskListByProjectProps {
  projectId: number;
}
export default function TaskListByProject({
  projectId,
}: TaskListByProjectProps) {
  const { getAllByProject } = useTask();
  const tasks = useStore(useTaskStore, (state) => state.tasks);
  const [tasksByProject, setTasksByProject] = useState<TaskDto[]>([]);
  const [filterKeyword, setFilterKeyword] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

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

  const filteredTasks = tasksByProject.filter((task) => {
    const matchesStatus = filterStatus ? task.status === filterStatus : true;
    const matchesKeyword = filterKeyword
      ? task.title?.toLowerCase().includes(filterKeyword.toLowerCase()) ||
        task.description?.toLowerCase().includes(filterKeyword.toLowerCase())
      : true;
    return matchesStatus && matchesKeyword;
  });

  return (
    <div className="flex w-full flex-col px-4 my-2">
      <div className="flex gap-4 mb-2">
        <input
          type="text"
          placeholder="Buscar por palabra clave..."
          value={filterKeyword}
          onChange={(e) => setFilterKeyword(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Todos los estados</option>
          <option value={TaskEstatusEnum.TO_DO}>To Do</option>
          <option value={TaskEstatusEnum.PROGRESS}>On progress</option>
          <option value={TaskEstatusEnum.COMPLETE}>Complete</option>
        </select>
      </div>
      <TaskList tasks={filteredTasks || []} />
    </div>
  );
}
