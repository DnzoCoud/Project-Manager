import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_PORTS } from '@app/contracts/microservices-ports';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROJECTS_CLIENT',
        transport: Transport.TCP,
        options: {
          port: MICROSERVICE_PORTS.PROJECTS_MICROSERVICE,
        },
      },
    ]),
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
