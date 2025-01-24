import { Body, Controller, Get, Post } from '@nestjs/common';
import { BaseController } from '../common/base-controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '@app/contracts/tasks/create-task.dto';

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
          project: await this.taskService.storeTask(createTaskDto),
        },
        'Tarea creada correctamente.',
      );
    } catch (error) {
      return this.errorResponse(error);
    }
  }
}
