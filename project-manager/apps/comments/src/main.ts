import { NestFactory } from '@nestjs/core';
import { CommentsModule } from './comments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MICROSERVICE_PORTS } from '@app/contracts/microservices-ports';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CommentsModule,
    {
      transport: Transport.TCP,
      options: {
        port: MICROSERVICE_PORTS.COMMENTS_MICROSERVICE,
      },
    },
  );
  await app.listen();
}
bootstrap();
