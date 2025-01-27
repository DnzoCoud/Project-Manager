export enum TaskEstatusEnum {
  TO_DO = "todo",
  PROGRESS = "progress",
  COMPLETE = "complete",
}

export interface CreateTaskDto {
  title: string;
  description: string;
  deadline: string;
  status: TaskEstatusEnum;
  projectId: number;
  assignedUserIds: number[];
  assignedTeamIds: number[];
}
