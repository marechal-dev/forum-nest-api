import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class AnswerPresenter {
  public static toHTTP(answer: Answer) {
    return {
      id: answer.id.toString(),
      content: answer.content,
      excerpt: answer.excerpt,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    };
  }
}
