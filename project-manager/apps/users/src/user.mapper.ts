import { UserDto, UserWithPasswordDto } from '@app/contracts/users/user.dto';
import { User } from './entities/user.entity';

export class UserMapper {
  static toDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
    };
  }

  static toDtoWithPassword(user: User): UserWithPasswordDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      password: user.password,
    };
  }
  static withPasswordToDto(user: UserWithPasswordDto): UserDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
    };
  }
}
