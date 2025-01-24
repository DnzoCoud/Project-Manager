import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from '@app/contracts/users/login.dto';
import { BaseController } from '../common/base-controller';

@Controller('auth')
export class AuthenticationController extends BaseController {
  constructor(private authService: AuthenticationService) {
    super();
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return this.successResponse(
        {
          authenticate: await this.authService.login(loginDto),
        },
        'Usuario autenticado correctamente',
      );
    } catch (error) {
      return this.errorResponse(error);
    }
  }
}
