import { PipeTransform, BadRequestException } from '@nestjs/common';

import { ZodError, ZodSchema } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class ZodValidationPipe implements PipeTransform {
  public constructor(private schema: ZodSchema) {}

  public transform(value: unknown) {
    try {
      this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          status: 'Bad Request',
          message: 'Validation failed',
          errors: fromZodError(error),
        });
      }

      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
