import { Controller, Get } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { COMMENTS_PATTERNS } from '@app/contracts/comments/comments.patterns';
import { CreateCommentDto } from '@app/contracts/comments/create-comment.dto';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @MessagePattern(COMMENTS_PATTERNS.FIND_ALL_BY_TASK)
  findAllByTask(taskId: number) {
    return this.commentsService.findAllByTask(taskId);
  }

  @MessagePattern(COMMENTS_PATTERNS.STORE)
  storeComment(@Payload() createCommentDto: CreateCommentDto) {
    return this.commentsService.storeComment(createCommentDto);
  }
}
