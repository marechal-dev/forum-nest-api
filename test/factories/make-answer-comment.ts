import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comment';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaAnswerCommentMapper } from '@/infra/database/prisma/mappers/prisma-answer-comment-mapper';

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityID,
) {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return answerComment;
}

@Injectable()
export class QuestionCommentFactory {
  public constructor(private readonly prisma: PrismaService) {}

  public async makePrismaQuestion(
    data: Partial<AnswerCommentProps> = {},
  ): Promise<AnswerComment> {
    const questionComment = makeAnswerComment(data);

    await this.prisma.comment.create({
      data: PrismaAnswerCommentMapper.toPrisma(questionComment),
    });

    return questionComment;
  }
}
