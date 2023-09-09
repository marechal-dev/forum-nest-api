import { Question } from '@/domain/forum/enterprise/entities/question';

export class QuestionPresenter {
  public static toHTTP(question: Question) {
    return {
      id: question.id.toString(),
      title: question.title,
      slug: question.slug.value,
      content: question.content,
      bestAnswerId: question.bestAnswerId?.toString(),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };
  }
}
