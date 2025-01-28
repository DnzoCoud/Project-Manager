import { UserDto } from "../users/user.dto";

export interface CommentDto {
  id: number;
  taskId: number;
  user: UserDto;
  comment: string;
  createdAt: string;
}
