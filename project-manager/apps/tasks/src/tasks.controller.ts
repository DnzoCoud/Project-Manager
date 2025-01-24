import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TASKS_PATTERS } from '@app/contracts/tasks/tasks.patterns';
import { CreateTaskDto } from '@app/contracts/tasks/create-task.dto';
import { TaskMapper } from './task.mapper';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern(TASKS_PATTERS.FIND_ALL)
  findAll(projectId: number) {
    return this.tasksService.findAll();
  }

  @MessagePattern(TASKS_PATTERS.STORE)
  async storeTask(@Payload() createTaskDto: CreateTaskDto) {
    const newTask = TaskMapper.toDto(
      await this.tasksService.storeTask(createTaskDto),
    );
    return newTask;
  }
}
