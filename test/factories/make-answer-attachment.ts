import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  AnswerAttachmentProps,
  AnswerAttachment,
} from '@/domain/forum/enterprise/entities/answer-attachment';

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const questionComment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  );

  return questionComment;
}
