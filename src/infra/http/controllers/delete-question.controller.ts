import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';

import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question';

@Controller('/questions/:id')
export class DeleteQuestionController {
  public constructor(
    private readonly deleteQuestionUseCase: DeleteQuestionUseCase,
  ) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async handle(
    @Param('id') questionId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { sub: userId } = user;

    const result = await this.deleteQuestionUseCase.execute({
      questionId,
      authorId: userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
