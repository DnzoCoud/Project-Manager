import { LoginDto, ValidatePasswordDto } from '@app/contracts/users/login.dto';
import { UserDto, UserWithPasswordDto } from '@app/contracts/users/user.dto';
import { USERS_PATTERS } from '@app/contracts/users/users.patterns';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class AuthenticationService {
  constructor(
    @Inject('USERS_SERVICE') private usersService: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const userDto = await firstValueFrom(
        this.usersService.send<UserWithPasswordDto>(
          USERS_PATTERS.GET_BY_EMAIL,
          {
            email: email,
          },
        ),
      );

      if (!userDto) {
        throw new UnauthorizedException('Usuario no encontrado');
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
        throw new UnauthorizedException('Credenciales inválidas');
      }
      return userDto as UserDto;
    } catch (error) {
      throw new UnauthorizedException('Credenciales inválidas');
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
