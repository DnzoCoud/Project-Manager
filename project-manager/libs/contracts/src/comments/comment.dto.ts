import { UserDto } from '../users/user.dto';

export class CommentDto {
  id: number;
  taskId: number;
  user: UserDto;
  comment: string;
  createdAt: string;
}
