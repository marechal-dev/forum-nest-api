import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments';
import { Controller } from '@nestjs/common';

@Controller('/question/:questionId/comments')
export class ListQuestionCommentsController {
  public constructor(
    private readonly fetchQuestionComments: FetchQuestionCommentsUseCase,
  ) {}
}
