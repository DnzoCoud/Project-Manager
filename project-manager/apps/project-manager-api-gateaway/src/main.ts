import { NestFactory } from '@nestjs/core';
import { ProjectManagerApiGateawayModule } from './project-manager-api-gateaway.module';
import { MICROSERVICE_PORTS } from '@app/contracts/microservices-ports';

async function bootstrap() {
  const app = await NestFactory.create(ProjectManagerApiGateawayModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  await app.listen(process.env.port ?? MICROSERVICE_PORTS.API_GATEAWAY);
}
bootstrap();
