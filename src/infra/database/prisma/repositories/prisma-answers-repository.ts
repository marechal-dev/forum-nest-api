import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { PrismaAnswerMapper } from '../mappers/prisma-answer-mapper';

@Injectable()
export class PrismaAnswersRepository extends AnswersRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer);

    await this.prisma.answer.create({
      data,
    });
  }

  public async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer);

    await this.prisma.answer.update({
      where: {
        id: answer.id.toString(),
      },
      data,
    });
  }

  public async delete(answer: Answer): Promise<void> {
    await this.prisma.answer.delete({
      where: {
        id: answer.id.toString(),
      },
    });
  }

  public async findById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    });

    if (!answer) {
      return null;
    }

    return PrismaAnswerMapper.toDomain(answer);
  }

  public async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const perPage = 20;

    const answers = await this.prisma.answer.findMany({
      where: {
        questionId,
      },
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return answers.map(PrismaAnswerMapper.toDomain);
  }
}
