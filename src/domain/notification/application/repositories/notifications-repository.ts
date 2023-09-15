import { Notification } from '../../enterprise/entities/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract save(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
}
