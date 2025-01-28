import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '@app/contracts/users/create-user.dto';
import { BaseController } from '../common/base-controller';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@Controller('users')
export class UsersController extends BaseController {
  constructor(private usersService: UsersService) {
    super();
  }

  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Get('/roles/all')
  async findAllRoles() {
    try {
      // return this.usersService.findAll();
      return this.successResponse(
        {
          roles: await this.usersService.findAllRoles(),
        },
        'Lista de roles',
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
