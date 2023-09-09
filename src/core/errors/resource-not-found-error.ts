import { UseCaseError } from './use-case-error';

export class ResourceNotFoundError extends Error implements UseCaseError {
  public constructor() {
    super('Resource not found');
  }
}
