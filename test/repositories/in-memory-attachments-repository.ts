import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment';

export class InMemoryAttachmentsRepository extends AttachmentsRepository {
  public items: Attachment[] = [];

  public async create(attachment: Attachment): Promise<void> {
    this.items.push(attachment);
  }
}
