import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret_key',
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, LocalStrategy],
})
export class AuthenticationModule {}
