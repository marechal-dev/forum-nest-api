import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('/answers/comments/:id')
export class DeleteAnswerCommentController {
  public constructor(
    private readonly deleteAnswerComment: DeleteAnswerCommentUseCase,
  ) {}

  @Delete()
  @HttpCode(204)
  public async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') answerCommentId: string,
  ) {
    const result = await this.deleteAnswerComment.execute({
      answerCommentId,
      authorId: user.sub,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException();
        case NotAllowedError:
          throw new UnauthorizedException();
        default:
          throw new BadRequestException();
      }
    }
  }
}
