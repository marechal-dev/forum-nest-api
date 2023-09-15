import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';
import { PrismaAnswerAttachmentMapper } from '../mappers/prisma-answer-attachment-mapper';

@Injectable()
export class PrismaAnswerAttachmentsRepository extends AnswerAttachmentsRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async findManyByAnswerId(
    answerId: string,
  ): Promise<AnswerAttachment[]> {
    const answerAttachments = await this.prisma.attachment.findMany({
      where: {
        answerId,
      },
    });

    return answerAttachments.map(PrismaAnswerAttachmentMapper.toDomain);
  }

  public async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        answerId,
      },
    });
  }
}
