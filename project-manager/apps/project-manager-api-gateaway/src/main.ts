import { NestFactory } from '@nestjs/core';
import { ProjectManagerApiGateawayModule } from './project-manager-api-gateaway.module';

async function bootstrap() {
  const app = await NestFactory.create(ProjectManagerApiGateawayModule);
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
