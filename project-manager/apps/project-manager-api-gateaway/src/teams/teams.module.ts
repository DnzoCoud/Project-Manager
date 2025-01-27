import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_PORTS } from '@app/contracts/microservices-ports';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TEAMS_CLIENT',
        transport: Transport.TCP,
        options: {
          port: MICROSERVICE_PORTS.TEAMS_MICROSERVICE,
        },
      },
    ]),
    AuthenticationModule,
  ],
  providers: [TeamsService],
  controllers: [TeamsController],
})
export class TeamsModule {}
