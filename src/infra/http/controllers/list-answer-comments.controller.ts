import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments';
import { Controller } from '@nestjs/common';

@Controller('/answers/:answerId/comments')
export class ListAnswerCommentsController {
  public constructor(
    private readonly fetchAnswerComments: FetchAnswerCommentsUseCase,
  ) {}
}
