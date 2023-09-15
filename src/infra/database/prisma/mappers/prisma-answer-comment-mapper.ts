import { Prisma, Comment as PrismaComment } from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

export class PrismaAnswerCommentMapper {
  public static toDomain(raw: PrismaComment): AnswerComment {
    if (!raw.answerId) {
      throw new Error('Invalid Comment Type');
    }

    return AnswerComment.create(
      {
        content: raw.content,
        authorId: new UniqueEntityID(raw.authorId),
        answerId: new UniqueEntityID(raw.answerId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  public static toPrisma(
    answerComment: AnswerComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: answerComment.id.toString(),
      content: answerComment.content,
      authorId: answerComment.authorId.toString(),
      answerId: answerComment.answerId.toString(),
      createdAt: answerComment.createdAt,
      updatedAt: answerComment.updatedAt,
    };
  }
}
