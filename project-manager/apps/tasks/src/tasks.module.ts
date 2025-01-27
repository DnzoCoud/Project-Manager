import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TaskDataSource from './data/data-source';
import { Task } from './entities/task.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_PORTS } from '@app/contracts/microservices-ports';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await TaskDataSource.initialize();
        return TaskDataSource.options;
      },
    }),
    TypeOrmModule.forFeature([Task]),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: {
          port: MICROSERVICE_PORTS.USERS_MICROSERVICE,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'TEAMS_SERVICE',
        transport: Transport.TCP,
        options: {
          port: MICROSERVICE_PORTS.TEAMS_MICROSERVICE,
        },
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
