import { BadRequestException, Controller, Get, Param } from '@nestjs/common';

import { QuestionPresenter } from '../presenters/question-presenter';
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug';

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  public constructor(
    private readonly getQuestionBySlugUseCase: GetQuestionBySlugUseCase,
  ) {}

  @Get()
  public async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlugUseCase.execute({
      slug,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const question = result.value.question;

    return {
      question: QuestionPresenter.toHTTP(question),
    };
  }
}
