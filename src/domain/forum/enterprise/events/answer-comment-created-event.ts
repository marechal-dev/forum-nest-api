import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DomainEvent } from '@/core/events/domain-event';
import { AnswerComment } from '../entities/answer-comment';

export class AnswerCommentCreatedEvent implements DomainEvent {
  public ocurredAt: Date;
  private _answerComment: AnswerComment;

  public constructor(answerComment: AnswerComment) {
    this._answerComment = answerComment;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityID {
    return this._answerComment.id;
  }

  public get answerComment() {
    return this._answerComment;
  }
}
