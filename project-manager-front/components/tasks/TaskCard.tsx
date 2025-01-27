import { DateUtilities } from "@/lib/date.util";
import { TaskDto } from "@/types/tasks/task.dto";
import { Card } from "@heroui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { useMemo } from "react";
import { CiCalendar } from "react-icons/ci";
import { SlOptionsVertical } from "react-icons/sl";
import AssignedGroups from "../AssignedGroups";
import MainList, { ListProps } from "../MainList";
import { Chip } from "@heroui/chip";
import AssignedTeams from "../AssignedTeams";
import { taskStatusLibWithType } from "@/lib/status.util";
import MainModal from "../MainModal";
import { useModal } from "@/hooks/useModal";
import TaskForm from "./TaskForm";
interface TaskCardProps {
  task: TaskDto;
}
export default function TaskCard({ task }: TaskCardProps) {
  const { isOpen, open, close } = useModal();

  const listOptions = useMemo(() => {
    const list: ListProps[] = [
      {
        label: "Editar",
        key: "edit",
        color: "default",
        onPress: () => open(),
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
      <Card className=" flex flex-col  relative shadow-none border-2">
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
        <span className="space-y-1 p-2 h-full bg-gradient-to-tr from-slate-50 from-70% to-purple-100">
          <Chip color={taskStatusLibWithType(task.status)} variant="bordered">
            {task.status}
          </Chip>
          <h1 className="font-semibold text-sm">
            #{task.id} {task.title}
          </h1>
          <p className="text-muted-foreground text-xs">{task.description}</p>
        </span>
        <div className="flex items-center justify-between border-t p-2">
          <div className="flex items-center flex-1 justify-start gap-8">
            {task.assignedUsers.length > 0 && (
              <div>
                <small className="text-xs text-muted-foreground">
                  Personas
                </small>
                <AssignedGroups users={task.assignedUsers} />
              </div>
            )}
            {task.assignedTeams.length > 0 && (
              <div>
                <small className="text-xs text-muted-foreground">Equipos</small>
                <AssignedTeams teams={task.assignedTeams} />
              </div>
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
      <MainModal
        isOpen={isOpen}
        onOpenChange={close}
        title="Editar Tarea"
        content={<TaskForm id={task.id} />}
      />
    </>
  );
}
