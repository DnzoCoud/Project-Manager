import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '@app/contracts/projects/create-project.dto';
import { CreateTaskDto } from '@app/contracts/tasks/create-task.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
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
  
  assignTaskToProject(projectId: number, createTaskDto: CreateTaskDto) {

  }
}
