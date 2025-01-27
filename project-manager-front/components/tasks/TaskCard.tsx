import { DateUtilities } from "@/lib/date.util";
import { TaskDto } from "@/types/tasks/task.dto";
import { Card } from "@heroui/card";
import React, { useMemo } from "react";
import { CiCalendar } from "react-icons/ci";
import { SlOptionsVertical } from "react-icons/sl";
import MainList, { ListProps } from "../MainList";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import AssignedGroups from "../AssignedGroups";
interface TaskCardProps {
  task: TaskDto;
}
export default function TaskCard({ task }: TaskCardProps) {
  const listOptions = useMemo(() => {
    const list: ListProps[] = [
      {
        label: "Editar",
        key: "edit",
        color: "default",
      },
      {
        label: "Eliminar",
        key: "delete",
        color: "danger",
      },
    ];
    return list;
  }, [task.id]);

  return (
    <>
      <Card className=" flex flex-col  relative">
        <Popover placement="right">
          <PopoverTrigger>
            <span className="absolute right-3 top-2 size-6 flex items-center justify-center hover:bg-gray-basic rounded-full cursor-pointer">
              <SlOptionsVertical />
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <MainList items={listOptions} />
          </PopoverContent>
        </Popover>
        <span className="space-y-1 p-2 h-full bg-gradient-to-tr from-slate-50 to-purple-100">
          <h1 className="font-semibold text-sm">{task.title}</h1>
          <p className="text-muted-foreground text-xs">{task.description}</p>
        </span>
        <div className="flex items-center justify-between border-t p-2">
          <div className="py-2">
            {task.assignedUsers.length > 0 && (
              <AssignedGroups users={task.assignedUsers} />
            )}
          </div>
          <span className="flex items-center gap-2">
            <CiCalendar />
            <p className="text-muted-foreground text-xs">
              {DateUtilities.toShortString(task.deadline)}
            </p>
          </span>
        </div>
      </Card>
    </>
  );
}
