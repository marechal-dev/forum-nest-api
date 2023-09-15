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
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer';

const editAnswerBodySchema = z.object({
  content: z.string(),
});

type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>;

@Controller('/answers/:id')
export class EditAnswerController {
  public constructor(private readonly editAnswerUseCase: EditAnswerUseCase) {}

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async handle(
    @Body(new ZodValidationPipe(editAnswerBodySchema))
    body: EditAnswerBodySchema,
    @Param('id') answerId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { content } = body;
    const userId = user.sub;

    const result = await this.editAnswerUseCase.execute({
      answerId,
      content,
      authorId: userId,
      attachmentIds: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
