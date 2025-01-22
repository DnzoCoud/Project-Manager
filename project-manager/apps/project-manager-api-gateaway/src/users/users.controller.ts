import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '@app/contracts/users/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  store(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.store(createUserDto);
    } catch (error) {
      
    }
  }
}
