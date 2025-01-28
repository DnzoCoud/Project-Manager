import { CreateProjectDto } from '@app/contracts/projects/create-project.dto';
import { PROJECTS_PATTERS } from '@app/contracts/projects/projects.patterns';
import { CreateTaskDto } from '@app/contracts/tasks/create-task.dto';
import { TaskDto } from '@app/contracts/tasks/tasks.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProjectsService {
  constructor(@Inject('PROJECTS_CLIENT') private projectsClient: ClientProxy) {}

  findAll() {
    return firstValueFrom(
      this.projectsClient.send(PROJECTS_PATTERS.FIND_ALL, {}),
    );
  }

  storeProject(createProjectDto: CreateProjectDto) {
    return firstValueFrom(
      this.projectsClient.send(PROJECTS_PATTERS.STORE, createProjectDto),
    );
  }

  assignTaskToProject(projectId: number, createTaskDto: CreateTaskDto) {
    return firstValueFrom(
      this.projectsClient.send(PROJECTS_PATTERS.ASSIGN_TASK_TO_PROJECT, {
        projectId,
        createTaskDto,
      }),
    );
  }

  findTasksByProject(projectId: number) {
    return firstValueFrom(
      this.projectsClient.send<TaskDto[]>(
        PROJECTS_PATTERS.FIND_TASKS_BY_PROJECT,
        projectId,
      ),
    );
  }
}
