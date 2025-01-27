import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BaseController } from '../common/base-controller';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from '@app/contracts/teams/create-team.dto';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamsController extends BaseController {
  constructor(private teamsService: TeamsService) {
    super();
  }

  @Get()
  async findAll() {
    try {
      return this.successResponse(
        {
          teams: await this.teamsService.findAll(),
        },
        'Lista de equipos',
      );
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  @Post()
  async store(@Body() createTeamDto: CreateTeamDto) {
    try {
      return this.successResponse(
        {
          team: await this.teamsService.storeTeam(createTeamDto),
        },
        'Equipo creado correctamente.',
      );
    } catch (error) {
      return this.errorResponse(error);
    }
  }
}
