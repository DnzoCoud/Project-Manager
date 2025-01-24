import { UserDto } from "../users/user.dto";

export interface LoginResponse {
  user: UserDto;
  accessToken: string;
}
