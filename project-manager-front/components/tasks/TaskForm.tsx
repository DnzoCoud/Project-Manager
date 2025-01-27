import { useProject } from "@/hooks/projects/useProject";
import { CreateTaskDto, TaskEstatusEnum } from "@/types/tasks/create-task.dto";
import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import { Input, Textarea } from "@heroui/input";
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { useParams } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { GoPackageDependents } from "react-icons/go";

interface TaskFormProps {
  id?: number; //Id de la tarea SOLO PARA ACTUALIZAR
}
export default function TaskForm({ id }: TaskFormProps) {
  const { id: projectId } = useParams();
  const [value, setValue] = React.useState(
    parseDate(new Date().toISOString().split("T")[0])
  );
  const [taskData, setTaskData] = useState<CreateTaskDto>({
    title: "",
    description: "",
    deadline: new Date().toISOString().split("T")[0],
    projectId: 0,
    assignedTeamId: null,
    assignedUserId: null,
    status: TaskEstatusEnum.TO_DO,
  });

  const { assignTaskToProject, loading } = useProject();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (date: CalendarDate | null) => {
    const formattedDate = date ? date.toString() : ""; // Convertir a formato YYYY-MM-DD
    if (formattedDate) {
      setTaskData({
        ...taskData,
        deadline: formattedDate, // Guardamos la fecha en formato YYYY-MM-DD
      });
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await assignTaskToProject(Number(projectId), taskData);
    setTaskData({
      title: "",
      description: "",
      deadline: new Date().toISOString(),
      projectId: 0,
      assignedTeamId: null,
      assignedUserId: null,
      status: TaskEstatusEnum.TO_DO,
    });
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        label="Titulo de la tarea"
        name="title"
        isRequired
        value={taskData.title}
        onChange={handleChange}
      />
      <DatePicker
        label="Fecha limite"
        minValue={today(getLocalTimeZone())}
        value={value}
        onChange={(value) => {
          handleDateChange(value);
          if (value) setValue(value);
        }}
        isRequired
      />
      <Textarea
        label="Descripción"
        name="description"
        placeholder="Escribe una breve descripción de esta tarea"
        required
        value={taskData.description}
        onChange={handleChange}
      />
      <Button
        color="success"
        className="text-white"
        endContent={<GoPackageDependents />}
        isLoading={loading}
        type="submit"
      >
        Crear Tarea
      </Button>
    </form>
  );
}
