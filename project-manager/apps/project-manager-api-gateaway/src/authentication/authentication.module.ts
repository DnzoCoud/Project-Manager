import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_PORTS } from '@app/contracts/microservices-ports';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: {
          port: MICROSERVICE_PORTS.AUTH_MICROSERVICE,
        },
      },
    ]),
  ],
  providers: [AuthenticationService, JwtAuthGuard],
  controllers: [AuthenticationController],
  exports: [JwtAuthGuard, AuthenticationService],
})
export class AuthenticationModule {}
