import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';

import { z } from 'zod';

import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';

const answerQuestionBodySchema = z.object({
  content: z.string(),
});

type AnswerQuestionBodySchema = z.infer<typeof answerQuestionBodySchema>;

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  public constructor(
    private readonly answerQuestionUseCase: AnswerQuestionUseCase,
  ) {}

  @Post()
  public async handle(
    @Body(new ZodValidationPipe(answerQuestionBodySchema))
    body: AnswerQuestionBodySchema,
    @Param('questionId') questionId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { content } = body;
    const { sub: userId } = user;

    const result = await this.answerQuestionUseCase.execute({
      content,
      authorId: userId,
      questionId,
      attachmentsIds: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
