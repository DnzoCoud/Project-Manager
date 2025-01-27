import { TaskDto } from "@/types/tasks/task.dto";
import React from "react";

interface TaskInProgressProps {
  tasks: TaskDto[];
}
export default function TaskInProgress({ tasks }: TaskInProgressProps) {
  return <div>TaskInProgress</div>;
}
