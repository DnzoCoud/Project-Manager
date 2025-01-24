import { CreateTaskDto } from '@app/contracts/tasks/create-task.dto';
import { TASKS_PATTERS } from '@app/contracts/tasks/tasks.patterns';
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
}
