import { AUTH_PATTERNS } from '@app/contracts/authentication/auth.patterns';
import { LoginDto } from '@app/contracts/users/login.dto';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(@Inject('AUTH_CLIENT') private authClient: ClientProxy) {}

  login(loginDto: LoginDto) {
    return firstValueFrom(
      this.authClient.send(AUTH_PATTERNS.LOGIN, loginDto).pipe(
        catchError((error) => {
          console.log(error)
          throw new HttpException(
            error.response || error.message,
            error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      ),
    );
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
