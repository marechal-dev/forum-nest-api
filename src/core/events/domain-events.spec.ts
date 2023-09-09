import { AggregateRoot } from '../entities/aggregate-root';
import { UniqueEntityID } from '../entities/unique-entity-id';
import { DomainEvent } from './domain-event';
import { DomainEvents } from './domain-events';

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date;
  private readonly aggregate: CustomAggregate // eslint-disable-line

  public constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  public static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

describe('Domain Events Test Suite Case', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn();

    // Subscriber subscribed: Listening to the Created event
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    // Creating an aggregate but without persisting
    const aggregate = CustomAggregate.create();

    // Event created, but not dispatched
    expect(aggregate.domainEvents).toHaveLength(1);

    // Event dispatched, persisting
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    // Subscriber listens to the event and execute the callback
    expect(callbackSpy).toHaveBeenCalled();
    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
