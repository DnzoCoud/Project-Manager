import {
  RoleDto,
  UserDto,
  UserWithPasswordDto,
} from '@app/contracts/users/user.dto';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';

export class UserMapper {
  static roleDto(role: Role): RoleDto {
    return {
      id: role.id,
      name: role.name,
      prefix: role.prefix,
    };
  }

  static toDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      role: UserMapper.roleDto(user.role),
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
      role: UserMapper.roleDto(user.role),
    };
  }
  static withPasswordToDto(user: UserWithPasswordDto): UserDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      role: user.role,
    };
  }
}
