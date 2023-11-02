import { UseCaseError } from '@/core/errors/use-case-error';

export class InvalidAttachmentType extends Error implements UseCaseError {
  public constructor(type: string) {
    super(`Attachment of type ${type} not allowed.`);
  }
}
