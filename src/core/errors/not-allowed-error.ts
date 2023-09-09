import { UseCaseError } from './use-case-error';

export class NotAllowedError extends Error implements UseCaseError {
  public constructor() {
    super('Not allowed.');
  }
}
