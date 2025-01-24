import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_PORTS } from '@app/contracts/microservices-ports';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASKS_CLIENT',
        transport: Transport.TCP,
        options: {
          port: MICROSERVICE_PORTS.TASKS_MICROSERVICE,
        },
      },
    ]),
    AuthenticationModule,
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
