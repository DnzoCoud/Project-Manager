import { ProjectService } from "@/services/projects/project.service";
import { useProjectStore } from "@/stores/project.store";
import { ApiErrorResponse } from "@/types/api-response";
import { useState } from "react";
import { toast } from "sonner";

export const useProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);
  const projectService = new ProjectService();
  const { setProjects } = useProjectStore();

  const getAllProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.getAll();
      if (data) {
        setProjects(data.projects);
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
    getAllProjects,
    loading,
    error,
  };
};
