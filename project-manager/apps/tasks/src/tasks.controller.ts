import { CreateTaskDto } from '@app/contracts/tasks/create-task.dto';
import { TASKS_PATTERS } from '@app/contracts/tasks/tasks.patterns';
import { UpdateTaskDto } from '@app/contracts/tasks/update-task.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from './tasks.service';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern(TASKS_PATTERS.FIND_ALL)
  findAll() {
    return this.tasksService.findAll();
  }

  @MessagePattern(TASKS_PATTERS.FIND_BY_ID)
  findById(id: number) {
    return this.tasksService.findByIdWithRelations(id);
  }

  @MessagePattern(TASKS_PATTERS.FIND_ALL_BY_PROJECT)
  async findAllByProject(projectId: number) {
    const tasks = await this.tasksService.findAllByProject(projectId);
    return tasks;
  }

  @MessagePattern(TASKS_PATTERS.STORE)
  async storeTask(@Payload() createTaskDto: CreateTaskDto) {
    return this.tasksService.storeTask(createTaskDto);
  }

  @MessagePattern(TASKS_PATTERS.UPDATE)
  async updateTask(
    @Payload() payload: { taskId: number; updateTaskDto: UpdateTaskDto },
  ) {
    const { taskId, updateTaskDto } = payload;
    return this.tasksService.updateTask(taskId, updateTaskDto);
  }

  @MessagePattern(TASKS_PATTERS.DELETE)
  async deleteTask(taskId: number) {
    await this.tasksService.deleteTask(taskId);
    return true;
  }
}
