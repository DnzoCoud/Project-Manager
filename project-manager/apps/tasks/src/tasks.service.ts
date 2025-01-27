import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '@app/contracts/tasks/create-task.dto';
import { UpdateTaskDto } from '@app/contracts/tasks/update-task.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { USERS_PATTERS } from '@app/contracts/users/users.patterns';
import { UserDto } from '@app/contracts/users/user.dto';
import { TaskDto } from '@app/contracts/tasks/tasks.dto';
import { TeamDto } from '@app/contracts/teams/team.dto';
import { TEAMS_PATTERS } from '@app/contracts/teams/teams.pattern';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @Inject('USERS_SERVICE')
    private userService: ClientProxy,
    @Inject('TEAMS_SERVICE')
    private teamService: ClientProxy,
  ) {}

  findAll() {
    return this.taskRepository.find();
  }

  findById(id: number) {
    return this.taskRepository.findOneBy({ id });
  }
  existsById(id: number) {
    return this.taskRepository.existsBy({ id });
  }

  async findAllByProject(projectId: number) {
    const tasks = await this.taskRepository.find({
      where: {
        projectId,
      },
    });
    const allUserIds = tasks.flatMap((task) => task.assignedUserIds);
    const uniqueUserIds = [...new Set(allUserIds)];
    const users = await firstValueFrom(
      this.userService.send<UserDto[]>(
        USERS_PATTERS.FIND_BY_IDS,
        uniqueUserIds,
      ),
    );
    const allTeamIds = tasks.flatMap((task) => task.assignedTeamIds);
    const uniqueTeamIds = [...new Set(allTeamIds)];
    const teams = await firstValueFrom(
      this.teamService.send<TeamDto[]>(
        TEAMS_PATTERS.FIND_ALL_BY_IDS,
        uniqueTeamIds,
      ),
    );

    const tasksWithUsers: TaskDto[] = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      deadline: task.deadline.toISOString(),
      status: task.status,
      projectId: task.projectId,
      createdAt: task.created_at.toISOString(),
      updateddAt: task.updated_at.toISOString(),
      assignedUsers: task.assignedUserIds.map((id) =>
        users.find((user) => user.id === +id),
      ),
      assignedTeams: task.assignedTeamIds.map((id) =>
        teams.find((team) => team.id === +id),
      ),
    }));
    return tasksWithUsers;
  }

  async findAssignedUsersInTask(taskId: number) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });

    const userIds = task.assignedUserIds;
    const users = await firstValueFrom(
      this.userService.send<UserDto[]>(USERS_PATTERS.FIND_BY_IDS, userIds),
    );

    return users;
  }

  storeTask(createTaskDto: CreateTaskDto) {
    const newTask = this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      deadline: createTaskDto.deadline,
      status: createTaskDto.status,
      projectId: createTaskDto.projectId,
      assignedTeamIds: createTaskDto.assignedTeamIds,
      assignedUserIds: createTaskDto.assignedUserIds,
    });
    return this.taskRepository.save(newTask);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findById(id);
    if (!task) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    }
    Object.assign(task, updateTaskDto);
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: number) {
    const task = await this.findById(id);
    if (!task) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    }
    this.taskRepository.delete({
      id,
    });
  }
}
