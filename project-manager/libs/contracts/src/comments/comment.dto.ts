import { UserDto } from '../users/user.dto';

export class CommentDto {
  id: number;
  user: UserDto;
  comment: string;
  createdAt: string;
}
