import { CreateProjectDto } from '@app/contracts/projects/create-project.dto';
import { PROJECTS_PATTERS } from '@app/contracts/projects/projects.patterns';
import { CreateTaskDto } from '@app/contracts/tasks/create-task.dto';
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

  asssignTaskToProject(projectId:number, createTaskDto:CreateTaskDto){
    
  }
}
