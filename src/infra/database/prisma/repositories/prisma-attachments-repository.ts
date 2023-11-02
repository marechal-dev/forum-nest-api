import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment';
import { Injectable } from '@nestjs/common';
import { PrismaAttachmentMapper } from '../mappers/prisma-attachment-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAttachmentsRepository extends AttachmentsRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPrisma(attachment);

    await this.prisma.attachment.create({
      data,
    });
  }
}
