import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question';
import { Controller } from '@nestjs/common';

@Controller('/questions/:questionId/comments')
export class CommentQuestionController {
  public constructor(
    private readonly commentQuestion: CommentOnQuestionUseCase,
  ) {}
}
