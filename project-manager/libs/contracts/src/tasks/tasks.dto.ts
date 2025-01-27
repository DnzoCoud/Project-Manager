import { TeamDto } from '../teams/team.dto';
import { UserDto } from '../users/user.dto';

export class TaskDto {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
  projectId: number;
  createdAt: string;
  updateddAt: string;
  assignedUsers: UserDto[];
  assignedTeams: TeamDto[];
}
