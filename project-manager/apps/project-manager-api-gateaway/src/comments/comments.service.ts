import { COMMENTS_PATTERNS } from '@app/contracts/comments/comments.patterns';
import { CreateCommentDto } from '@app/contracts/comments/create-comment.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENTS_CLIENT')
    private commentsClient: ClientProxy,
  ) {}

  findAllByTask(taskId: number) {
    return firstValueFrom(
      this.commentsClient.send(COMMENTS_PATTERNS.FIND_ALL_BY_TASK, taskId),
    );
  }

  storeComment(createCommentDto: CreateCommentDto) {
    return firstValueFrom(
      this.commentsClient.send(COMMENTS_PATTERNS.STORE, createCommentDto),
    );
  }
}
