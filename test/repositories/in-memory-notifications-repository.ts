import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository';
import { Notification } from '@/domain/notification/enterprise/entities/notification';

export class InMemoryNotificationsRepository extends NotificationsRepository {
  public items: Notification[] = [];

  public async create(notification: Notification): Promise<void> {
    this.items.push(notification);
  }

  public async save(notification: Notification): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === notification.id.toString(),
    );

    this.items[itemIndex] = notification;
  }

  public async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.items.find(
      (item) => item.id.toString() === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }
}
