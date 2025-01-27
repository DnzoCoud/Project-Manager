import { TaskDto } from "@/types/tasks/task.dto";
import React from "react";

interface TaskCompleteProps {
  tasks: TaskDto[];
}
export default function TaskComplete({}: TaskCompleteProps) {
  return <div>TaskComplete</div>;
}
