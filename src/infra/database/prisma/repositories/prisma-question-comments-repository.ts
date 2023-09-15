import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { PrismaQuestionCommentMapper } from '../mappers/prisma-question-comment-mapper';

@Injectable()
export class PrismaQuestionCommentsRepository extends QuestionCommentsRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async create(questionComment: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComment);

    await this.prisma.comment.create({
      data,
    });
  }

  public async delete(questionComment: QuestionComment): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: questionComment.id.toString(),
      },
    });
  }

  public async findById(id: string): Promise<QuestionComment | null> {
    const raw = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!raw) {
      return null;
    }

    return PrismaQuestionCommentMapper.toDomain(raw);
  }

  public async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const perPage = 20;
    const skip = (page - 1) * perPage;

    const questionComments = await this.prisma.comment.findMany({
      where: {
        questionId,
      },
      take: perPage,
      skip,
    });

    return questionComments.map(PrismaQuestionCommentMapper.toDomain);
  }
}
