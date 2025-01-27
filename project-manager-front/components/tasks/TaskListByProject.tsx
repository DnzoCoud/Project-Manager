"use client";
import { useTask } from "@/hooks/tasks/useTask";
import { useTaskStore } from "@/stores/task.store";
import useStore from "@/stores/useStore";
import React, { useEffect } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import TaskList from "./TaskToDo";
import TaskInProgress from "./TaskInProgress";
import TaskComplete from "./TaskComplete";
import { TaskEstatusEnum } from "@/types/tasks/create-task.dto";

interface TaskListByProjectProps {
  projectId: number;
}
export default function TaskListByProject({
  projectId,
}: TaskListByProjectProps) {
  const { getAllByProject } = useTask();
  const tasks = useStore(useTaskStore, (state) => state.tasks);

  const tasksByProject =
    tasks?.filter((task) => task.projectId === projectId) || [];

  useEffect(() => {
    getAllByProject(projectId);
  }, [projectId]);

  return (
    <div className="flex w-full flex-col px-4">
      <Tabs aria-label="Options">
        <Tab key="photos" title="To do">
          <TaskList
            tasks={tasksByProject.filter(
              (task) => task.status === TaskEstatusEnum.TO_DO
            )}
          />
        </Tab>
        <Tab key="music" title="In Progress">
          <TaskList
            tasks={tasksByProject.filter(
              (task) => task.status === TaskEstatusEnum.PROGRESS
            )}
          />
        </Tab>
        <Tab key="videos" title="Complete">
          <TaskList
            tasks={tasksByProject.filter(
              (task) => task.status === TaskEstatusEnum.COMPLETE
            )}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
