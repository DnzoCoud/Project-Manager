import { UserDto } from "../users/user.dto";

export interface TaskDto {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
  projectId: number;
  createdAt: string;
  updateddAt: string;
  assignedUsers: UserDto[];
}
