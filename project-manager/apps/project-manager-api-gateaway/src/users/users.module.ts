import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MICROSERVICE_PORTS } from '@app/contracts/microservices-ports';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_CLIENT',
        transport: Transport.TCP,
        options: { port: MICROSERVICE_PORTS.USERS_MICROSERVICE },
      },
    ]),
    AuthenticationModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
