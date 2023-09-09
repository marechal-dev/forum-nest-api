import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public constructor(private readonly prisma: PrismaService) {}

  public async create(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async delete(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async findById(id: string): Promise<AnswerComment | null> {
    throw new Error('Method not implemented.');
  }

  public async findManyByAnswerId(
    answerId: string,
    paginationParams: PaginationParams,
  ): Promise<AnswerComment[]> {
    throw new Error('Method not implemented.');
  }
}
