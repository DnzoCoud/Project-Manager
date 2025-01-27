import { ProjectService } from "@/services/projects/project.service";
import { useProjectStore } from "@/stores/project.store";
import { useTaskStore } from "@/stores/task.store";
import { ApiErrorResponse } from "@/types/api-response";
import { CreateProjectDto } from "@/types/projects/create-project.dto";
import { CreateTaskDto } from "@/types/tasks/create-task.dto";
import { useState } from "react";
import { toast } from "sonner";

export const useProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);
  const projectService = new ProjectService();
  const { setProjects, addProject } = useProjectStore();
  const { addTask } = useTaskStore();

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

  const storeProject = async (createProjectDto: CreateProjectDto) => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.store(createProjectDto);
      if (data) {
        addProject(data.project);
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
  const assignTaskToProject = async (
    projectId: number,
    createTaskDto: CreateTaskDto
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.assignTaskToProject(
        projectId,
        createTaskDto
      );
      if (data) {
        addTask(data.task);
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
    storeProject,
    assignTaskToProject,
    loading,
    error,
  };
};
