import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BaseController } from '../common/base-controller';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from '@app/contracts/projects/create-project.dto';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { CreateTaskDto } from '@app/contracts/tasks/create-task.dto';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController extends BaseController {
  constructor(private projectService: ProjectsService) {
    super();
  }
  @Get()
  async findAll() {
    try {
      return this.successResponse(
        {
          projects: await this.projectService.findAll(),
        },
        'Lista de proyectos',
      );
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  @Post()
  async store(@Body() createProjectDto: CreateProjectDto) {
    try {
      return this.successResponse(
        {
          project: await this.projectService.storeProject(createProjectDto),
        },
        'Proyecto creado correctamente.',
      );
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  @Get(':projectId/tasks')
  async findTasksByProject(@Param('projectId') projecId: number) {
    try {
      return this.successResponse(
        {
          tasks: await this.projectService.findTasksByProject(projecId),
        },
        'Lista de tareas.',
      );
    } catch (error) {
      return this.errorResponse(error);
    }
  }
  @Post(':projectId/tasks')
  async assignTaskToProject(
    @Param('projectId') projecId: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    try {
      return this.successResponse(
        {
          task: await this.projectService.asssignTaskToProject(
            projecId,
            createTaskDto,
          ),
        },
        'Tarea asignada correctamente.',
      );
    } catch (error) {
      return this.errorResponse(error);
    }
  }
}
