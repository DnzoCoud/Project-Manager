import { useTask } from "@/hooks/tasks/useTask";
import { TaskEstatusEnum } from "@/types/tasks/create-task.dto";
import { TaskDto } from "@/types/tasks/task.dto";
import { Button } from "@heroui/button";
import React, { ChangeEvent } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
interface StatusChangeButtonsProps {
  task: TaskDto;
}
export default function StatusChangeButtons({
  task,
}: StatusChangeButtonsProps) {
  const { loading, updateTask } = useTask();

  const handleChangeStatus = async (status: TaskEstatusEnum) => {
    await updateTask(task.id, {
      status,
    });
  };

  return (
    <div className="w-full flex items-center justify-between gap-4">
      {task.status !== TaskEstatusEnum.TO_DO && (
        <Button
          className="w-1/2"
          size="sm"
          color="secondary"
          variant="bordered"
          startContent={<IoIosArrowRoundBack />}
          onPress={() => {
            if(task.status === TaskEstatusEnum.PROGRESS){
                handleChangeStatus(TaskEstatusEnum.TO_DO)
            }else{
                handleChangeStatus(TaskEstatusEnum.PROGRESS)
            }
          }}
        >
          Devolver estado
        </Button>
      )}
      {task.status === TaskEstatusEnum.TO_DO && (
        <Button
          className="w-1/2"
          color="primary"
          size="sm"
          variant="bordered"
          isLoading={loading}
          onPress={() => handleChangeStatus(TaskEstatusEnum.PROGRESS)}
        >
          Poner En progreso
        </Button>
      )}
      {task.status === TaskEstatusEnum.PROGRESS && (
        <Button
          className="w-1/2"
          color="primary"
          size="sm"
          variant="bordered"
          isLoading={loading}
          onPress={() => handleChangeStatus(TaskEstatusEnum.COMPLETE)}
        >
          Completar Tarea
        </Button>
      )}
    </div>
  );
}
