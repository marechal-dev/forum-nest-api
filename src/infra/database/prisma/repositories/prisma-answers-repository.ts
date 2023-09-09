import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async save(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async delete(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async findById(id: string): Promise<Answer | null> {
    throw new Error('Method not implemented.');
  }

  public async findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]> {
    throw new Error('Method not implemented.');
  }
}
