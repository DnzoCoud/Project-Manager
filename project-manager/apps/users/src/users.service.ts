import { Injectable } from '@nestjs/common';
import { UserDto } from '@app/contracts/users/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  private users: UserDto[] = [
    {
      id: 'sadasdasdasdas',
      firstName: 'John',
      lastName: 'Doe',
      email: 'sasdasdasd',
    },
  ];

  findAll() {
    return this.users;
  }
}
