import { AUTH_PATTERNS } from '@app/contracts/authentication/auth.patterns';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @MessagePattern(AUTH_PATTERNS.LOGIN)
  login() {
    return { str: this.authenticationService.getHello() };
  }
}
