import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '@app/contracts/tasks/create-task.dto';
import { UpdateTaskDto } from '@app/contracts/tasks/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  findAll() {
    return this.taskRepository.find();
  }

  findById(id: number) {
    return this.taskRepository.findOneBy({ id });
  }
  existsById(id: number) {
    return this.taskRepository.existsBy({ id });
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

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findById(id);
    if (!task) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    }
    Object.assign(task, updateTaskDto);
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: number) {
    const task = await this.findById(id);
    if (!task) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    }
    this.taskRepository.delete({
      id,
    });
  }
}
