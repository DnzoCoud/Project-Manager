import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserDto } from '@app/contracts/users/user.dto';
import { USERS_PATTERS } from '@app/contracts/users/users.patterns';
import { TeamDto } from '@app/contracts/teams/team.dto';
import { CreateTeamDto } from '@app/contracts/teams/create-team.dto';
import { ServerException } from 'libs/exceptions/custom.exceptions';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @Inject('USERS_SERVICE')
    private userService: ClientProxy,
  ) {}

  async findAll() {
    const teams = await this.teamRepository.find();
    const allUserIds = teams.flatMap((team) => team.assignedUserIds);
    const uniqueUserIds = [...new Set(allUserIds)];
    const users = await firstValueFrom(
      this.userService.send<UserDto[]>(
        USERS_PATTERS.FIND_BY_IDS,
        uniqueUserIds,
      ),
    );

    const teamsWithUsers: TeamDto[] = teams.map((team) => ({
      id: team.id,
      name: team.name,
      description: team.description,
      users: team.assignedUserIds.map((id) =>
        users.find((user) => user.id === +id),
      ),
    }));
    return teamsWithUsers;
  }

  async store(createTeamDto: CreateTeamDto) {
    try {
      const newTeam = this.teamRepository.create({
        name: createTeamDto.name,
        description: createTeamDto.description,
        assignedUserIds: createTeamDto.assignedUserIds,
      });

      const savedTeam = await this.teamRepository.save(newTeam);
      const users = await firstValueFrom(
        this.userService.send<UserDto[]>(
          USERS_PATTERS.FIND_BY_IDS,
          savedTeam.assignedUserIds,
        ),
      );

      const teamWithUsers: TeamDto = {
        id: savedTeam.id,
        name: savedTeam.name,
        description: savedTeam.description,
        users: savedTeam.assignedUserIds.map((id) =>
          users.find((user) => user.id === +id),
        ),
      };

      return teamWithUsers;
    } catch (error: any) {
      throw new ServerException();
    }
  }
}
