import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';
import { PrismaQuestionAttachmentMapper } from '../mappers/prisma-question-attachment-mapper';

@Injectable()
export class PrismaQuestionAttachmentsRepository extends QuestionAttachmentsRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = await this.prisma.attachment.findMany({
      where: {
        questionId,
      },
    });

    return questionAttachments.map(PrismaQuestionAttachmentMapper.toDomain);
  }

  public async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        questionId,
      },
    });
  }
}
