import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments';
import { Controller } from '@nestjs/common';

@Controller('/question/:questionId/comments')
export class FetchQuestionCommentsController {
  public constructor(
    private readonly fetchQuestionComments: FetchQuestionCommentsUseCase,
  ) {}
}
