import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student';
import { WrongCredentialsError } from '@/domain/forum/application/use-cases/errors/wrong-credentials-error';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sessions')
export class AuthenticateController {
  public constructor(
    private readonly authenticateStudent: AuthenticateStudentUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  public async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const result = await this.authenticateStudent.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { accessToken } = result.value;

    return {
      accessToken,
    };
  }
}
