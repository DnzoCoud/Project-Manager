import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { USERS_PATTERS } from '@app/contracts/users/users.patterns';
import { CreateUserDto } from '@app/contracts/users/create-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USERS_PATTERS.FIND_ALL)
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern(USERS_PATTERS.STORE)
  store(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.storeUser(createUserDto);
  }
}
