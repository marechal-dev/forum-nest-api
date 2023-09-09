import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';
import { SendNotificationUseCase } from './send-notification';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let systemUnderTest: SendNotificationUseCase;

describe('Send Notification Use Case Test Suite', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    systemUnderTest = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    );
  });

  it('should be able to send a notification', async () => {
    const result = await systemUnderTest.execute({
      recipientId: '1',
      title: 'Nova notificação',
      content: 'Conteúdo da notificação',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    );
  });
});
