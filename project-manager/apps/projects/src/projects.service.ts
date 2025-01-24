import { CreateProjectDto } from '@app/contracts/projects/create-project.dto';
import {
  CreateTaskDto,
  TaskEstatusEnum,
} from '@app/contracts/tasks/create-task.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { firstValueFrom } from 'rxjs';
import { TASKS_PATTERS } from '@app/contracts/tasks/tasks.patterns';
import { TaskDto } from '@app/contracts/tasks/tasks.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @Inject('TASKS_SERVICE')
    private tasksService: ClientProxy,
  ) {}

  findAll() {
    return this.projectRepository.find();
  }

  findById(id: number) {
    return this.projectRepository.findOneBy({ id });
  }

  existById(id: number) {
    return this.projectRepository.existsBy({ id });
  }

  storeProject(createProjectDto: CreateProjectDto) {
    const newProject = this.projectRepository.create({
      name: createProjectDto.name,
      description: createProjectDto.description,
      isActive: true,
    });
    return this.projectRepository.save(newProject);
  }

  async assignTaskToProject(projectId: number, createTaskDto: CreateTaskDto) {
    const existsProject = await this.existById(projectId);
    if (!existsProject)
      throw new NotFoundException('No exsite el proyecto con este id');

    createTaskDto.projectId = projectId;
    createTaskDto.status = TaskEstatusEnum.TO_DO;
    return firstValueFrom(
      this.tasksService.send(TASKS_PATTERS.STORE, createTaskDto),
    );
  }

  async findAllTaskByProject(projectId: number) {
    const existsProject = await this.existById(projectId);
    if (!existsProject)
      throw new NotFoundException('No exsite el proyecto con este id');

    return firstValueFrom(
      this.tasksService.send<TaskDto[]>(
        TASKS_PATTERS.FIND_ALL_BY_PROJECT,
        projectId,
      ),
    );
  }
}
