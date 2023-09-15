import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer';
import { Controller } from '@nestjs/common';

@Controller('/questions/:questionId/answers/:answerId/set-best')
export class SelectQuestionBestAnswerController {
  public constructor(
    private readonly chooseQuestionBestAnswer: ChooseQuestionBestAnswerUseCase,
  ) {}
}
