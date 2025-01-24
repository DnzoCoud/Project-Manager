import { CreateUserDto } from '@app/contracts/users/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DuplicatedResourceException } from 'libs/exceptions/duplicated.exception';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ValidatePasswordDto } from '@app/contracts/users/login.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

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
      password: await this.hashPassword(createUserDto.password),
    });

    return await this.usersRepository.save(newUser);
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  existByEmail(email: string) {
    return this.usersRepository.existsBy({ email });
  }

  async validatePassword({ password, hash }: ValidatePasswordDto) {
    return bcrypt.compare(password, hash);
  }
}
