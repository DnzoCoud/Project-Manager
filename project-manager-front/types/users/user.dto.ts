export interface UserDto {
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
