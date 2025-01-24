import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProjectDataSource from './data/data-source';
import { Project } from './entities/project.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_PORTS } from '@app/contracts/microservices-ports';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await ProjectDataSource.initialize();
        return ProjectDataSource.options;
      },
    }),
    TypeOrmModule.forFeature([Project]),
    ClientsModule.register([
      {
        name: 'TASKS_SERVICE',
        transport: Transport.TCP,
        options: {
          port: MICROSERVICE_PORTS.TASKS_MICROSERVICE,
        },
      },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
