import { LoginDto, ValidatePasswordDto } from '@app/contracts/users/login.dto';
import { UserDto, UserWithPasswordDto } from '@app/contracts/users/user.dto';
import { UserMapper } from 'apps/users/src/user.mapper';
import { USERS_PATTERS } from '@app/contracts/users/users.patterns';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
@Injectable()
export class AuthenticationService {
  constructor(
    @Inject('USERS_SERVICE') private usersService: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const userDto = await firstValueFrom(
        this.usersService.send<UserWithPasswordDto | null>(
          USERS_PATTERS.GET_BY_EMAIL,
          {
            email: email,
          },
        ),
      );

      if (!userDto) {
        throw new RpcException({
          statusCode: 404, // Código de estado HTTP 404
          message: 'Usuario no encontrado',
        });
      }
      const isPasswordValid = await firstValueFrom(
        this.usersService.send<boolean, ValidatePasswordDto>(
          USERS_PATTERS.VALIDATE_PASSWORD,
          {
            password: password,
            hash: userDto.password,
          },
        ),
      );

      if (!isPasswordValid) {
        throw new RpcException({
          statusCode: 401, // Código de estado HTTP 401
          message: 'Credenciales inválidas',
        });
      }
      return UserMapper.withPasswordToDto(userDto);
    } catch (error) {
      throw new RpcException({
        statusCode: 500, // Código de estado HTTP 500 para errores internos
        message: 'Error al validar el usuario',
      });
    }
  }

  private async generateToken(user: UserDto) {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }

  async validateAndGenerateToken(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const accessToken = await this.generateToken(user);
    return {
      user,
      accessToken,
    };
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
}
