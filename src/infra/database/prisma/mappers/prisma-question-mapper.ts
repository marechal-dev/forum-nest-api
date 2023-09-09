import { Prisma, Question as PrismaQuestion } from '@prisma/client';

import { Question } from '@/domain/forum/enterprise/entities/question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

export class PrismaQuestionMapper {
  public static toDomain(raw: PrismaQuestion): Question {
    return Question.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityID(raw.authorId),
        bestAnswerId: raw.bestAnswerId
          ? new UniqueEntityID(raw.bestAnswerId)
          : null,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  public static toPrisma(
    question: Question,
  ): Prisma.QuestionUncheckedCreateInput {
    return {
      id: question.id.toString(),
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      authorId: question.authorId.toString(),
      bestAnswerId: question.bestAnswerId?.toString(),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };
  }
}
