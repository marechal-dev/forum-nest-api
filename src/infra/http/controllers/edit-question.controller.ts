import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';

import { z } from 'zod';

import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question';

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>;

@Controller('/questions/:id')
export class EditQuestionController {
  public constructor(
    private readonly editQuestionUseCase: EditQuestionUseCase,
  ) {}

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async handle(
    @Body(new ZodValidationPipe(editQuestionBodySchema))
    body: EditQuestionBodySchema,
    @Param('id') questionId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body;
    const { sub: userId } = user;

    const result = await this.editQuestionUseCase.execute({
      questionId,
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
