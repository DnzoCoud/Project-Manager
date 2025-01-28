import { taskStatusLibWithType } from "@/lib/status.util";
import { TaskDto } from "@/types/tasks/task.dto";
import { Chip } from "@heroui/chip";
import { Textarea } from "@heroui/input";
import React from "react";
import StatusChangeButtons from "./StatusChangeButtons";
import CommentList from "../comments/CommentList";

interface TaskInfoProps {
  task: TaskDto;
}
export default function TaskInfo({ task }: TaskInfoProps) {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex items-center gap-4">
        <Chip color={taskStatusLibWithType(task.status)} variant="bordered">
          {task.status}
        </Chip>
        <h1 className="font-extrabold text-xl">{task.title}</h1>
      </div>
      <p className="text-muted-foreground text-sm">{task.description}</p>
      <StatusChangeButtons task={task} />
      <CommentList />
    </div>
  );
}
