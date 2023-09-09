import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DomainEvent } from '@/core/events/domain-event';
import { QuestionComment } from '../entities/question-comment';

export class QuestionCommentCreatedEvent implements DomainEvent {
  public ocurredAt: Date;
  private _questionComment: QuestionComment;

  public constructor(questionComment: QuestionComment) {
    this._questionComment = questionComment;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityID {
    return this._questionComment.id;
  }

  public get questionComment() {
    return this._questionComment;
  }
}
