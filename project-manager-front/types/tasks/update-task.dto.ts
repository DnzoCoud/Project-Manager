import { TaskEstatusEnum } from "./create-task.dto";

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  deadline?: string;
  status?: TaskEstatusEnum;
  projectId?: number;
  assignedUserId?: number[];
  assignedTeamId?: number[];
}
