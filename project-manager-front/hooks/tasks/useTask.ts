import { TaskService } from "@/services/tasks/tasks.service";
import { useTaskStore } from "@/stores/task.store";
import { ApiErrorResponse } from "@/types/api-response";
import { useState } from "react";
import { toast } from "sonner";

export const useTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);
  const { setTasks } = useTaskStore();
  const taskService = new TaskService();

  const getAllByProject = async (projectId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getAllByProject(projectId);
      if (data) {
        setTasks(data.tasks);
        return true;
      }
    } catch (error: any) {
      setError(error);
      toast.error(error.error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllByProject,
    loading,
    error,
  };
};
