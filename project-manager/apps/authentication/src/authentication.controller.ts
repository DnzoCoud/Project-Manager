import { AUTH_PATTERNS } from '@app/contracts/authentication/auth.patterns';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from '@app/contracts/users/login.dto';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @MessagePattern(AUTH_PATTERNS.LOGIN)
  login(@Payload() loginDto: LoginDto) {
    return this.authenticationService.validateAndGenerateToken(loginDto);
  }

  @MessagePattern(AUTH_PATTERNS.VALIDATE_TOKEN)
  validateToken(token: string) {
    return this.authenticationService.validateToken(token);
  }
}
