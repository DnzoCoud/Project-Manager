import { UserDto } from "../users/user.dto";

export interface TeamDto {
  id: number;
  name: string;
  description: string;
  users: UserDto[];
}
