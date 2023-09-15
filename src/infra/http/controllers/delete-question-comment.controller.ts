import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment';
import { Controller } from '@nestjs/common';

@Controller('/questions/:questionId/comments/:id')
export class DeleteQuestionCommentController {
  public constructor(
    private readonly deleteQuestionComment: DeleteQuestionCommentUseCase,
  ) {}
}
