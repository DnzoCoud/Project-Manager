import { CreateUserDto } from '@app/contracts/users/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DuplicatedResourceException } from 'libs/exceptions/duplicated.exception';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
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

    return await this.usersRepository.save(newUser);
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  existByEmail(email: string) {
    return this.usersRepository.existsBy({ email });
  }
}
