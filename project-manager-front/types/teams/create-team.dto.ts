export interface CreateTeamDto {
  name: string;
  description: string;
  assignedUserIds: number[];
}
