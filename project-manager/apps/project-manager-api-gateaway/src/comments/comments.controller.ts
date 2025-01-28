import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { BaseController } from '../common/base-controller';
import { CreateCommentDto } from '@app/contracts/comments/create-comment.dto';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController extends BaseController {
  constructor(private commentService: CommentsService) {
    super();
  }

  @Get('task/:taskId')
  async findAllByTask(@Param('taskId') taskId: number) {
    try {
      return this.successResponse(
        {
          projects: await this.commentService.findAllByTask(taskId),
        },
        'Lista de comentarios',
      );
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  @Post('task/:taskId')
  async store(
    @Param('taskId') taskId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    try {
      createCommentDto.taskId = taskId;
      return this.successResponse(
        {
          comment: await this.commentService.storeComment(createCommentDto),
        },
        'Comentario creado correctamente.',
      );
    } catch (error) {
      return this.errorResponse(error);
    }
  }
}
