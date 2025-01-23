import { NestFactory } from '@nestjs/core';
import { ProjectsModule } from './projects.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MICROSERVICE_PORTS } from '@app/contracts/microservices-ports';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProjectsModule,
    {
      transport: Transport.TCP,
      options: {
        port: MICROSERVICE_PORTS.PROJECTS_MICROSERVICE,
      },
    },
  );

  await app.listen();
}
bootstrap();
