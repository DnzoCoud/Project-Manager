import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MICROSERVICE_PORTS } from '@app/contracts/microservices-ports';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TasksModule,
    {
      transport: Transport.TCP,
      options: {
        port: MICROSERVICE_PORTS.TASKS_MICROSERVICE,
      },
    },
  );
  await app.listen();
}
bootstrap();
