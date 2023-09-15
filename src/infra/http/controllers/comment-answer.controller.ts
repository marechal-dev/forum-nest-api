import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer';
import { Controller } from '@nestjs/common';

@Controller('/answers/:answerId/comments')
export class CommentAnswerController {
  public constructor(private readonly commentAnswer: CommentOnAnswerUseCase) {}
}
