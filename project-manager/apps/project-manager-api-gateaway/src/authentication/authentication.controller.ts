import { Body, Controller, HttpException, Post } from '@nestjs/common';
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
      const ex = this.errorResponse(error);
      throw new HttpException(ex, Number(ex.statusCode));
    }
  }
}
