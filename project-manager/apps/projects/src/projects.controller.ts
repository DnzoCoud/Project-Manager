import { CreateProjectDto } from '@app/contracts/projects/create-project.dto';
import { PROJECTS_PATTERS } from '@app/contracts/projects/projects.patterns';
import { CreateTaskDto } from '@app/contracts/tasks/create-task.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProjectsService } from './projects.service';

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

  @MessagePattern(PROJECTS_PATTERS.ASSIGN_TASK_TO_PROJECT)
  assignTaskToProject(
    @Payload() payload: { projectId: number; createTaskDto: CreateTaskDto },
  ) {
    const { projectId, createTaskDto } = payload;
    return this.projectsService.assignTaskToProject(projectId, createTaskDto);
  }

  @MessagePattern(PROJECTS_PATTERS.FIND_TASKS_BY_PROJECT)
  findTasksByProject(projectId: number) {
    return this.projectsService.findAllTaskByProject(projectId);
  }
}
