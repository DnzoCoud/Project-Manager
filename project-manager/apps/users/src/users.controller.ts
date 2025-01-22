import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { USERS_PATTERS } from '@app/contracts/users/users.patterns';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USERS_PATTERS.FIND_ALL)
  findAll() {
    return this.usersService.findAll();
  }
}
