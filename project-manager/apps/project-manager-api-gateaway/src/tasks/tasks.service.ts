import { CreateTaskDto } from '@app/contracts/tasks/create-task.dto';
import { TaskDto } from '@app/contracts/tasks/tasks.dto';
import { TASKS_PATTERS } from '@app/contracts/tasks/tasks.patterns';
import { UpdateTaskDto } from '@app/contracts/tasks/update-task.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_CLIENT')
    private tasksClient: ClientProxy,
  ) {}

  findAll() {
    return firstValueFrom(this.tasksClient.send(TASKS_PATTERS.FIND_ALL, {}));
  }

  storeTask(createTaskDto: CreateTaskDto) {
    return firstValueFrom(
      this.tasksClient.send(TASKS_PATTERS.STORE, createTaskDto),
    );
  }

  updateTask(taskId: number, updateTaskDto: UpdateTaskDto) {
    return firstValueFrom(
      this.tasksClient.send(TASKS_PATTERS.UPDATE, {
        taskId,
        updateTaskDto,
      }),
    );
  }

  async deleteTask(taskId: number) {
    await firstValueFrom(this.tasksClient.send(TASKS_PATTERS.DELETE, taskId));
  }

  findTasksByProject(projectId: number) {
    return firstValueFrom(
      this.tasksClient.send<TaskDto[]>(
        TASKS_PATTERS.FIND_ALL_BY_PROJECT,
        projectId,
      ),
    );
  }
}
