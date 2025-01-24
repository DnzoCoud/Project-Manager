import { TaskEstatusEnum } from './create-task.dto';

export class UpdateTaskDto {
  title?: string;
  description?: string;
  deadline?: string;
  status?: TaskEstatusEnum;
  projectId?: number;
  assignedUserId?: number | null;
  assignedTeamId?: number | null;
}
