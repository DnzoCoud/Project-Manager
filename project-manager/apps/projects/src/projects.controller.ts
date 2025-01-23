import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PROJECTS_PATTERS } from '@app/contracts/projects/projects.patterns';
import { CreateProjectDto } from '@app/contracts/projects/create-project.dto';

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @MessagePattern(PROJECTS_PATTERS.FIND_ALL)
  findAll() {
    return this.projectsService.findAll();
  }

  @MessagePattern(PROJECTS_PATTERS.STORE)
  storeProject(@Payload() createProjectDto: CreateProjectDto) {
    return this.projectsService.storeProject(createProjectDto);
  }
}
