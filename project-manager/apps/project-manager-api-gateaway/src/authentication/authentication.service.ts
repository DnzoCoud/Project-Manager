import { AUTH_PATTERNS } from '@app/contracts/authentication/auth.patterns';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthenticationService {
  constructor(@Inject('AUTH_CLIENT') private authClient: ClientProxy) {}

  login() {
    return this.authClient.send(AUTH_PATTERNS.LOGIN, {});
  }
}
