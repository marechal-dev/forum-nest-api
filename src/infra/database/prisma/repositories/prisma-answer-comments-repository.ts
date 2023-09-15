import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { PrismaAnswerCommentMapper } from '../mappers/prisma-answer-comment-mapper';

@Injectable()
export class PrismaAnswerCommentsRepository extends AnswerCommentsRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async create(answerComment: AnswerComment): Promise<void> {
    const data = PrismaAnswerCommentMapper.toPrisma(answerComment);

    await this.prisma.comment.create({
      data,
    });
  }

  public async delete(answerComment: AnswerComment): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: answerComment.id.toString(),
      },
    });
  }

  public async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!answerComment) {
      return null;
    }

    return PrismaAnswerCommentMapper.toDomain(answerComment);
  }

  public async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const perPage = 20;

    const answerComments = await this.prisma.comment.findMany({
      where: {
        answerId,
      },
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return answerComments.map(PrismaAnswerCommentMapper.toDomain);
  }
}
