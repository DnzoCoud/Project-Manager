import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '@app/contracts/users/create-user.dto';
import { BaseController } from '../common/base-controller';

@Controller('users')
export class UsersController extends BaseController {
  constructor(private usersService: UsersService) {
    super();
  }

  @Get()
  async findAll() {
    try {
      // return this.usersService.findAll();
      return this.successResponse(
        {
          users: await this.usersService.findAll(),
        },
        'Lista de usuarios',
      );
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  @Post()
  async store(@Body() createUserDto: CreateUserDto) {
    try {
      return this.successResponse(
        {
          user: await this.usersService.store(createUserDto),
        },
        'Usuario creado correctamente.',
      );
    } catch (error) {
      return this.errorResponse(error);
    }
  }
}
