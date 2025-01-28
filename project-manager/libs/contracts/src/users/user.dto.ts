export class UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  role: RoleDto;
}

export interface RoleDto {
  id: number;
  name: string;
  prefix: string;
}

export class UserWithPasswordDto extends UserDto {
  password: string;
}
