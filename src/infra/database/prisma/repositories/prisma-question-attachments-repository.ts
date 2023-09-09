import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public constructor(private readonly prisma: PrismaService) {}

  public async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    throw new Error('Method not implemented.');
  }

  public async deleteManyByQuestionId(questionId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
