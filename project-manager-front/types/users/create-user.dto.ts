export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export enum RolePrefix {
  ADMIN = "ADM",
  MEMBER = "USR",
}
