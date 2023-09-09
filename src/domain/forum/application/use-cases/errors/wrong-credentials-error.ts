import { UseCaseError } from '@/core/errors/use-case-error';

export class WrongCredentialsError extends Error implements UseCaseError {
  public constructor() {
    super('Credentials are not valid.');
  }
}
