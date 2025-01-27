import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TeamDataSource from './data/data-source';
import { Team } from './entities/team.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_PORTS } from '@app/contracts/microservices-ports';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await TeamDataSource.initialize();
        return TeamDataSource.options;
      },
    }),
    TypeOrmModule.forFeature([Team]),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: {
          port: MICROSERVICE_PORTS.USERS_MICROSERVICE,
        },
      },
    ]),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
