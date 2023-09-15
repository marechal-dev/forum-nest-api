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
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer';

@Controller('/answers/:id')
export class DeleteAnswerController {
  public constructor(
    private readonly deleteAnswerUseCase: DeleteAnswerUseCase,
  ) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async handle(
    @Param('id') answerId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { sub: userId } = user;

    const result = await this.deleteAnswerUseCase.execute({
      answerId,
      authorId: userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
