import { TaskEstatusEnum } from "@/types/tasks/create-task.dto";

export const taskStatusLib = (status: string) => {
  const statusColors: Record<string, string> = {
    [TaskEstatusEnum.TO_DO]: "bg-yellow-500 text-white", // Amarillo
    [TaskEstatusEnum.PROGRESS]: "bg-blue-500 text-white", // Azul
    [TaskEstatusEnum.COMPLETE]: "bg-green-500 text-white", // Verde
  };

  return statusColors[status] || "bg-gray-500 text-white"; // Valor por defecto en gris
};

export const taskStatusLibWithType = (
  status: string,
):
  | "success"
  | "default"
  | "primary"
  | "secondary"
  | "warning"
  | "danger"
  | undefined => {
  const statusTypes: Record<
    string,
    | "success"
    | "default"
    | "primary"
    | "secondary"
    | "warning"
    | "danger"
    | undefined
  > = {
    [TaskEstatusEnum.TO_DO]: "warning", // "warning" para tareas por hacer
    [TaskEstatusEnum.PROGRESS]: "primary", // "primary" para tareas en progreso
    [TaskEstatusEnum.COMPLETE]: "success", // "success" para tareas completas
  };

  return statusTypes[status] || "default"; // Valor por defecto: "default"
};
