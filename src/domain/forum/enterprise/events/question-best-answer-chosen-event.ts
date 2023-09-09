import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DomainEvent } from '@/core/events/domain-event';
import { Question } from '../entities/question';

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  public ocurredAt: Date;
  private _question: Question;
  private _bestAnswerId: UniqueEntityID;

  public constructor(question: Question, bestAnswerId: UniqueEntityID) {
    this._question = question;
    this._bestAnswerId = bestAnswerId;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityID {
    return this._question.id;
  }

  public get question() {
    return this._question;
  }

  public get bestAnswerId() {
    return this._bestAnswerId;
  }
}
