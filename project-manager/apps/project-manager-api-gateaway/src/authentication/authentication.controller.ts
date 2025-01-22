import { Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('/login')
  login() {
    return this.authService.login();
  }
}
