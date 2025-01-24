import { TaskDto } from '@app/contracts/tasks/tasks.dto';
import { Task } from './entities/task.entity';

export class TaskMapper {
  static toDto(task: Task): TaskDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      deadline: task.deadline.toLocaleString(),
      projectId: task.projectId,
      createdAt: task.created_at.toLocaleString(),
      updateddAt: task.updated_at.toLocaleString(),
    };
  }
}
