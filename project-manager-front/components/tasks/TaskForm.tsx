import { useProject } from "@/hooks/projects/useProject";
import { useUser } from "@/hooks/users/useUser";
import { useUserStore } from "@/stores/user.store";
import useStore from "@/stores/useStore";
import { CreateTaskDto, TaskEstatusEnum } from "@/types/tasks/create-task.dto";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { useParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { GoPackageDependents } from "react-icons/go";

interface TaskFormProps {
  id?: number; //Id de la tarea SOLO PARA ACTUALIZAR
}
export default function TaskForm({ id }: TaskFormProps) {
  const { id: projectId } = useParams();
  const [value, setValue] = React.useState(
    parseDate(new Date().toISOString().split("T")[0])
  );
  const { getAllUsers, loading: usersLoading } = useUser();
  const { users } = useUserStore();

  const [taskData, setTaskData] = useState<CreateTaskDto>({
    title: "",
    description: "",
    deadline: new Date().toISOString().split("T")[0],
    projectId: Number(projectId),
    assignedTeamIds: [],
    assignedUserIds: [],
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
      assignedTeamIds: [],
      assignedUserIds: [],
      status: TaskEstatusEnum.TO_DO,
    });
  };

  useEffect(() => {
    getAllUsers();
  }, [projectId]);

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
      <Select
        label="Asignar tarea a ciertas personas"
        placeholder="Asigna a una persona"
        selectionMode="multiple"
        isLoading={usersLoading}
        items={users}
        onSelectionChange={(keys) => {
          setTaskData({
            ...taskData,
            assignedUserIds: Array.from(keys).map((key) => Number(key)),
          });
        }}
      >
        {(user) => (
          <SelectItem key={user.id} textValue={user.firstName}>
            <div className="flex gap-2 items-center">
              <Avatar
                alt={user.firstName}
                className="flex-shrink-0"
                size="sm"
                name={user.firstName}
                color="secondary"
              />
              <div className="flex flex-col">
                <span className="text-small">{user.firstName}</span>
                <span className="text-tiny text-default-400">{user.email}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
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
