import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DomainEvent } from '@/core/events/domain-event';
import { Answer } from '../entities/answer';

export class AnswerCreatedEvent implements DomainEvent {
  public ocurredAt: Date;
  private _answer: Answer;

  public constructor(answer: Answer) {
    this._answer = answer;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityID {
    return this._answer.id;
  }

  public get answer() {
    return this._answer;
  }
}
