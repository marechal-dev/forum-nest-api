import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers';
import { Controller } from '@nestjs/common';

@Controller('/questions/:questionId/answers')
export class ListQuestionAnswersController {
  public constructor(
    private readonly fetchQuestionAnswers: FetchQuestionAnswersUseCase,
  ) {}
}
