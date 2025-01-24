import { AUTH_PATTERNS } from '@app/contracts/authentication/auth.patterns';
import { LoginDto } from '@app/contracts/users/login.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(@Inject('AUTH_CLIENT') private authClient: ClientProxy) {}

  login(loginDto: LoginDto) {
    return firstValueFrom(this.authClient.send(AUTH_PATTERNS.LOGIN, loginDto));
  }

  async validateToken(token: string) {
    try {
      const isValid = await firstValueFrom(
        this.authClient.send(AUTH_PATTERNS.VALIDATE_TOKEN, token),
      );
      return isValid;
    } catch (error) {
      return false;
    }
  }
}
