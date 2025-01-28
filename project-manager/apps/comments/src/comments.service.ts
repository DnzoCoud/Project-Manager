import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { USERS_PATTERS } from '@app/contracts/users/users.patterns';
import { CommentDto } from '@app/contracts/comments/comment.dto';
import { UserDto } from '@app/contracts/users/user.dto';
import { CreateCommentDto } from '@app/contracts/comments/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @Inject('USERS_SERVICE')
    private userService: ClientProxy,
    @Inject('TASKS_SERVICE')
    private taskService: ClientProxy,
  ) {}

  async findAllByTask(taskId: number) {
    const comments = await this.commentRepository.find({
      where: {
        taskId,
      },
    });
    const allUserIds = comments.flatMap((comment) => comment.userId);
    const uniqueUserIds = [...new Set(allUserIds)];
    const users = await firstValueFrom(
      this.userService.send<UserDto[]>(
        USERS_PATTERS.FIND_BY_IDS,
        uniqueUserIds,
      ),
    );

    const commentsWithUsers: CommentDto[] = comments.map((comment) => ({
      id: comment.id,
      comment: comment.comment,
      taskId: comment.taskId,
      createdAt: comment.created_at.toISOString(),
      user: users.find((user) => user.id === +comment.userId),
    }));

    return commentsWithUsers;
  }

  async storeComment(createCommentDto: CreateCommentDto) {
    const newComment = this.commentRepository.create({
      taskId: createCommentDto.taskId,
      userId: createCommentDto.userId,
      comment: createCommentDto.comment,
      parentCommentId: createCommentDto.parentCommentId,
    });
    const savedComment = await this.commentRepository.save(newComment);
    const user = await firstValueFrom(
      this.userService.send<UserDto>(
        USERS_PATTERS.FIND_BY_ID,
        savedComment.userId,
      ),
    );
    const commentWithUsers: CommentDto = {
      id: savedComment.id,
      comment: savedComment.comment,
      taskId: savedComment.taskId,
      createdAt: savedComment.created_at.toISOString(),
      user: user,
    };
    return commentWithUsers;
  }

  getCountByTask(taskId: number) {
    return this.commentRepository.countBy({ taskId });
  }
}
