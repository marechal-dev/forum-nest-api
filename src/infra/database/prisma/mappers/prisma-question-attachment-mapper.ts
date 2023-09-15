import { Attachment as PrismaAttachment } from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';

export class PrismaQuestionAttachmentMapper {
  public static toDomain(raw: PrismaAttachment): QuestionAttachment {
    if (!raw.questionId) {
      throw new Error('Invalid Attachment Type');
    }

    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        questionId: new UniqueEntityID(raw.questionId),
      },
      new UniqueEntityID(raw.id),
    );
  }
}
