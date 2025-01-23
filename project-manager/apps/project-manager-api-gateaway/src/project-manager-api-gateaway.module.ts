import { Module } from '@nestjs/common';
import { ProjectManagerApiGateawayController } from './project-manager-api-gateaway.controller';
import { ProjectManagerApiGateawayService } from './project-manager-api-gateaway.service';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [UsersModule, AuthenticationModule, ProjectsModule],
  controllers: [ProjectManagerApiGateawayController],
  providers: [ProjectManagerApiGateawayService],
})
export class ProjectManagerApiGateawayModule {}
