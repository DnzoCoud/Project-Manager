import { CreateUserDto } from '@app/contracts/users/create-user.dto';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DuplicatedResourceException } from 'libs/exceptions/duplicated.exception';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ValidatePasswordDto } from '@app/contracts/users/login.dto';
@Injectable()
export class UsersService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async onApplicationBootstrap() {
    await this.createDefaultRoles(); //Al inicializar el servicio automaticamente crear los roles
  }

  private async createDefaultRoles() {
    const defaultRoles = [
      { name: 'Admin', prefix: 'ADM' },
      { name: 'Member', prefix: 'USR' },
    ];

    for (const roleData of defaultRoles) {
      const exists = await this.rolesRepository.findOne({
        where: { name: roleData.name },
      });
      if (!exists) {
        const role = this.rolesRepository.create(roleData);
        await this.rolesRepository.save(role);
        console.log(
          `Role ${roleData.name} with prefix ${roleData.prefix} created.`,
        );
      }
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async findAll() {
    return await this.usersRepository.find({ relations: ['role'] });
  }

  async storeUser(createUserDto: CreateUserDto) {
    if (await this.existByEmail(createUserDto.email)) {
      throw new DuplicatedResourceException(
        'Ya hay un usuario registrado con esta cedula',
      );
    }
    const role = await this.rolesRepository.findOne({
      where: {
        prefix: createUserDto.role,
      },
    });

    const newUser = this.usersRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: await this.hashPassword(createUserDto.password),
      role,
    });

    return await this.usersRepository.save(newUser);
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  existByEmail(email: string) {
    return this.usersRepository.existsBy({ email });
  }

  findByIds(ids: number[]) {
    return this.usersRepository.find({
      where: {
        id: In(ids),
      },
      relations: ['role'],
    });
  }
  findById(id: number) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
      relations: ['role'],
    });
  }

  findAllRoles() {
    return this.rolesRepository.find();
  }

  async validatePassword({ password, hash }: ValidatePasswordDto) {
    return bcrypt.compare(password, hash);
  }
}
