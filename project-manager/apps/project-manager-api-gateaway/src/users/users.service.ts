import { CreateUserDto } from '@app/contracts/users/create-user.dto';
import { UserDto } from '@app/contracts/users/user.dto';
import { USERS_PATTERS } from '@app/contracts/users/users.patterns';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_CLIENT') private usersClient: ClientProxy) {}

  findAll() {
    return this.usersClient.send(USERS_PATTERS.FIND_ALL, {});
  }

  store(createUserDto: CreateUserDto) {
    return this.usersClient
      .send<UserDto, CreateUserDto>(USERS_PATTERS.STORE, createUserDto)
      .pipe();
  }
}
