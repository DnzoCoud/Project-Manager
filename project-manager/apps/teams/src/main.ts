import { NestFactory } from '@nestjs/core';
import { TeamsModule } from './teams.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MICROSERVICE_PORTS } from '@app/contracts/microservices-ports';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TeamsModule,
    {
      transport: Transport.TCP,
      options: {
        port: MICROSERVICE_PORTS.TEAMS_MICROSERVICE,
      },
    },
  );
  await app.listen();
}
bootstrap();
