export class CreateCommentDto {
  taskId: number;
  userId: number;
  parentCommentId: number | null;
  comment: string;
}
