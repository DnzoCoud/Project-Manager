import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { USERS_PATTERS } from '@app/contracts/users/users.patterns';
import { CreateUserDto } from '@app/contracts/users/create-user.dto';
import { ValidatePasswordDto } from '@app/contracts/users/login.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USERS_PATTERS.FIND_ALL)
  async findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern(USERS_PATTERS.STORE)
  store(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.storeUser(createUserDto);
  }

  @MessagePattern(USERS_PATTERS.GET_BY_EMAIL)
  async findByEmail(@Payload() payload: { email: string }) {
    const { email } = payload;
    return await this.usersService.findByEmail(email);
  }

  @MessagePattern(USERS_PATTERS.VALIDATE_PASSWORD)
  validatePassword(@Payload() validatePasswordDto: ValidatePasswordDto) {
    return this.usersService.validatePassword(validatePasswordDto);
  }
}
