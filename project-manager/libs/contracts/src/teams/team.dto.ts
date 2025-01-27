import { UserDto } from '../users/user.dto';

export class TeamDto {
  id: number;
  name: string;
  description: string;
  users: UserDto[];
}
