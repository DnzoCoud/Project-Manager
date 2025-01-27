import { CreateTeamDto } from '@app/contracts/teams/create-team.dto';
import { TEAMS_PATTERS } from '@app/contracts/teams/teams.pattern';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TeamsService {
  constructor(
    @Inject('TEAMS_CLIENT')
    private teamsClient: ClientProxy,
  ) {}

  findAll() {
    return firstValueFrom(this.teamsClient.send(TEAMS_PATTERS.FIND_ALL, {}));
  }

  storeTeam(createTeamDto: CreateTeamDto) {
    return firstValueFrom(
      this.teamsClient.send(TEAMS_PATTERS.STORE, createTeamDto),
    );
  }
}
