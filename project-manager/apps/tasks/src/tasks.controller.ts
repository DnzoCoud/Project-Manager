import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TASKS_PATTERS } from '@app/contracts/tasks/tasks.patterns';
import { CreateTaskDto } from '@app/contracts/tasks/create-task.dto';
import { TaskMapper } from './task.mapper';
import { UpdateTaskDto } from '@app/contracts/tasks/update-task.dto';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern(TASKS_PATTERS.FIND_ALL)
  findAll() {
    return this.tasksService.findAll();
  }

  @MessagePattern(TASKS_PATTERS.FIND_ALL_BY_PROJECT)
  async findAllByProject(projectId: number) {
    const tasks = await this.tasksService.findAllByProject(projectId);
    const dtos = tasks.length > 0 ? tasks.map(TaskMapper.toDto) : [];
    return dtos;
  }

  @MessagePattern(TASKS_PATTERS.STORE)
  async storeTask(@Payload() createTaskDto: CreateTaskDto) {
    const newTask = TaskMapper.toDto(
      await this.tasksService.storeTask(createTaskDto),
    );
    return newTask;
  }

  @MessagePattern(TASKS_PATTERS.UPDATE)
  async updateTask(
    @Payload() payload: { taskId: number; updateTaskDto: UpdateTaskDto },
  ) {
    const { taskId, updateTaskDto } = payload;
    const newTask = TaskMapper.toDto(
      await this.tasksService.updateTask(taskId, updateTaskDto),
    );
    return newTask;
  }

  @MessagePattern(TASKS_PATTERS.DELETE)
  async deleteTask(taskId: number) {
    await this.tasksService.deleteTask(taskId);
    return true;
  }
}
