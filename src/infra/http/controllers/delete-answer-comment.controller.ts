import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment';
import { Controller } from '@nestjs/common';

@Controller('/answers/:answerId/comments/:id')
export class DeleteAnswerCommentController {
  public constructor(
    private readonly deleteAnswerComment: DeleteAnswerCommentUseCase,
  ) {}
}
