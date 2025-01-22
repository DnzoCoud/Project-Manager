import { Module } from '@nestjs/common';
import { ProjectManagerApiGateawayController } from './project-manager-api-gateaway.controller';
import { ProjectManagerApiGateawayService } from './project-manager-api-gateaway.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ProjectManagerApiGateawayController],
  providers: [ProjectManagerApiGateawayService],
})
export class ProjectManagerApiGateawayModule {}
