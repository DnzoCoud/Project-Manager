import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BaseController } from '../common/base-controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '@app/contracts/tasks/create-task.dto';
import { UpdateTaskDto } from '@app/contracts/tasks/update-task.dto';

@Controller('tasks')
export class TasksController extends BaseController {
  constructor(private taskService: TasksService) {
    super();
  }

  @Get()
  async findAll() {
    try {
      return this.successResponse(
        {
          tasks: await this.taskService.findAll(),
        },
        'Lista de tareas',
      );
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  @Post()
  async store(@Body() createTaskDto: CreateTaskDto) {
    try {
      return this.successResponse(
        {
          task: await this.taskService.storeTask(createTaskDto),
        },
        'Tarea creada correctamente.',
      );
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  @Patch(':taskId')
  async updateTask(
    @Param('taskId') taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      return this.successResponse(
        {
          task: await this.taskService.updateTask(taskId, updateTaskDto),
        },
        'Tarea actualizada correctamente.',
      );
    } catch (error) {
      return this.errorResponse(error);
    }
  }
}
