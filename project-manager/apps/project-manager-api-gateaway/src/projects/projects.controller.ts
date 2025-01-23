import { Body, Controller, Get, Post } from '@nestjs/common';
import { BaseController } from '../common/base-controller';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from '@app/contracts/projects/create-project.dto';

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
}
