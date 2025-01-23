import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '@app/contracts/projects/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  findAll() {
    return this.projectRepository.find();
  }

  storeProject(createProjectDto: CreateProjectDto) {
    const newProject = this.projectRepository.create({
      name: createProjectDto.name,
      description: createProjectDto.description,
      isActive: true,
    });
    return this.projectRepository.save(newProject);
  }
}
