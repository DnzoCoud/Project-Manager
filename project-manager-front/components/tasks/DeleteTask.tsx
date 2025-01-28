import { useTask } from "@/hooks/tasks/useTask";
import { Button } from "@heroui/button";
import React, { ChangeEvent } from "react";
import { toast } from "sonner";

interface DeleteTaskProps {
  taskId: number;
  onCancel: VoidFunction;
}

export default function DeleteTask({ taskId, onCancel }: DeleteTaskProps) {
  const { deleteTask, loading } = useTask();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    await deleteTask(taskId);
    toast.success("Tarea eliminada correctamente");
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <p>Encerio quieres elimnar la tarea?</p>
      <div className="w-full flex items-center justify-around gap-2">
        <Button className="w-1/2" onPress={onCancel}>
          Cancelar
        </Button>
        <Button
          className="w-1/2"
          color="danger"
          isLoading={loading}
          type="submit"
        >
          Eliminar
        </Button>
      </div>
    </form>
  );
}
