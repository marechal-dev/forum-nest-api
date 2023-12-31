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

  public async createMany(attachments: AnswerAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return;
    }

    const data = PrismaAnswerAttachmentMapper.toPrismaUpdateMany(attachments);

    await this.prisma.attachment.updateMany(data);
  }

  public async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return;
    }

    const attachmentsIds = attachments.map((attachment) =>
      attachment.id.toString(),
    );

    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachmentsIds,
        },
      },
    });
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
