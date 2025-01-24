import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProjectDataSource from './data/data-source';
import { Project } from './entities/project.entity';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await ProjectDataSource.initialize();
        return ProjectDataSource.options;
      },
    }),
    TypeOrmModule.forFeature([Project]),
    // ClientsModule.register({})
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
