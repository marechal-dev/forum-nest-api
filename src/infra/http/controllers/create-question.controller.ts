import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

import { z } from 'zod';

import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

@Controller('/questions')
export class CreateQuestionController {
  public constructor(
    private readonly createQuestionUseCase: CreateQuestionUseCase,
  ) {}

  @Post()
  public async handle(
    @Body(new ZodValidationPipe(createQuestionBodySchema))
    body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body;
    const { sub: userId } = user;

    const result = await this.createQuestionUseCase.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
