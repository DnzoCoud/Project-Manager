import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '@app/contracts/tasks/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  findAll() {
    return this.taskRepository.find();
  }

  findAllByProject(projectId: number) {
    return this.taskRepository.find({
      where: {
        projectId,
      },
    });
  }

  storeTask(createTaskDto: CreateTaskDto) {
    const newTask = this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      deadline: createTaskDto.deadline,
      status: createTaskDto.status,
      projectId: createTaskDto.projectId,
      assignedTeamId: createTaskDto.assignedTeamId,
      assignedUserId: createTaskDto.assignedUserId,
    });
    return this.taskRepository.save(newTask);
  }
}
