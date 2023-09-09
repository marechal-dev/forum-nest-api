import { DomainEvents } from '@/core/events/domain-events';
import { EventHandler } from '@/core/events/event-handler';
import { SendNotificationUseCase } from '../use-cases/send-notification';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { QuestionCommentCreatedEvent } from '@/domain/forum/enterprise/events/question-comment-created-event';

export class OnQuestionCommentCreated implements EventHandler {
  public constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  public setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewQuestionCommentNotification.bind(this),
      QuestionCommentCreatedEvent.name,
    );
  }

  private async sendNewQuestionCommentNotification({
    questionComment,
  }: QuestionCommentCreatedEvent) {
    const question = await this.questionsRepository.findById(
      questionComment.questionId.toString(),
    );

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Novo comentário em "${question.title
          .substring(0, 20)
          .concat('...')}"`,
        content: questionComment.excerpt,
      });
    }
  }
}
