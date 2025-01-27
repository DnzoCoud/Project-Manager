import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BaseController } from '../common/base-controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '@app/contracts/tasks/create-task.dto';
import { UpdateTaskDto } from '@app/contracts/tasks/update-task.dto';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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

  @Get(':taskId')
  async findById(@Param('taskId') taskId: number) {
    try {
      return this.successResponse(
        {
          task: await this.taskService.findById(taskId),
        },
        'Información de tarea',
      );
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  @Get('project/:projectId')
  async findAllByProject(@Param('projectId') projectId: number) {
    try {
      return this.successResponse(
        {
          tasks: await this.taskService.findTasksByProject(projectId),
        },
        'Lista de tareas por proyecto',
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

  @Delete(':taskId')
  async deleteTask(@Param('taskId') taskId: number) {
    try {
      await this.taskService.deleteTask(taskId);
      return this.successResponse(null, 'Tarea eliminada correctamente.');
    } catch (error) {
      return this.errorResponse(error);
    }
  }
}
