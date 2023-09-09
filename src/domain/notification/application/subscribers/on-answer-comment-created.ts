import { DomainEvents } from '@/core/events/domain-events';
import { EventHandler } from '@/core/events/event-handler';
import { SendNotificationUseCase } from '../use-cases/send-notification';
import { AnswerCommentCreatedEvent } from '@/domain/forum/enterprise/events/answer-comment-created-event';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';

export class OnAnswerCommentCreated implements EventHandler {
  public constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  public setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerCommentNotification.bind(this),
      AnswerCommentCreatedEvent.name,
    );
  }

  private async sendNewAnswerCommentNotification({
    answerComment,
  }: AnswerCommentCreatedEvent) {
    const answer = await this.answersRepository.findById(
      answerComment.answerId.toString(),
    );

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Novo comentário na sua resposta"`,
        content: answerComment.excerpt,
      });
    }
  }
}
