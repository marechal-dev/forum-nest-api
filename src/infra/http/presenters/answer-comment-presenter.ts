import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

export class AnswerCommentPresenter {
  public static toHTTP(answerComment: AnswerComment) {
    return {
      id: answerComment.id.toString(),
      content: answerComment.content,
      excerpt: answerComment.excerpt,
      createdAt: answerComment.createdAt,
      updatedAt: answerComment.updatedAt,
    };
  }
}
