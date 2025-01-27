import { TaskDto } from "@/types/tasks/task.dto";
import React from "react";
import TaskCard from "./TaskCard";
import { Alert } from "@heroui/alert";

interface TaskToDoProps {
  tasks: TaskDto[];
}
export default function TaskList({ tasks }: TaskToDoProps) {
  return (
    <div className="w-full grid grid-cols-4 gap-4">
      {tasks.length > 0 &&
        tasks.map((task) => <TaskCard key={task.id} task={task} />)}
      {tasks.length == 0 && (
        <div className="flex items-center justify-center w-full">
          <Alert
            description={"No tienes ninguna tarea por aqui..."}
            title={"Sin tareas al pendiente :D"}
          />
        </div>
      )}
    </div>
  );
}
