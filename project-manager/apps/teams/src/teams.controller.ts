import { Controller, Get } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TEAMS_PATTERS } from '@app/contracts/teams/teams.pattern';
import { CreateTeamDto } from '@app/contracts/teams/create-team.dto';

@Controller()
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @MessagePattern(TEAMS_PATTERS.FIND_ALL)
  findAll() {
    return this.teamsService.findAll();
  }

  @MessagePattern(TEAMS_PATTERS.FIND_ALL_BY_IDS)
  findAllByIds(ids: number[]) {
    return this.teamsService.findByIds(ids);
  }

  @MessagePattern(TEAMS_PATTERS.STORE)
  store(@Payload() createTeamDto: CreateTeamDto) {
    return this.teamsService.store(createTeamDto);
  }
}
