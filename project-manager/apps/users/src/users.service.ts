import { Injectable } from '@nestjs/common';
import { UserDto } from '@app/contracts/users/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateUserDto } from '@app/contracts/users/create-user.dto';
import { DuplicatedResourceException } from 'libs/exceptions/duplicated.exception';

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

  async storeUser(createUserDto: CreateUserDto) {
    if (await this.existByEmail(createUserDto.email)) {
      throw new DuplicatedResourceException(
        'Ya hay un usuario registrado con esta cedula',
      );
    }

    const newUser = this.usersRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: createUserDto.password,
    });

    return this.usersRepository.save(newUser);
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  existByEmail(email: string) {
    return this.usersRepository.existsBy({ email });
  }
}
