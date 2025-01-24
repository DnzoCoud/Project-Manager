export class UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
}

export class UserWithPasswordDto extends UserDto {
  password: string;
}
