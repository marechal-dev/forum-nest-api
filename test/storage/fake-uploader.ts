import {
  UploadParams,
  Uploader,
} from '@/domain/forum/application/storage/uploader';
import { randomUUID } from 'node:crypto';

interface Upload {
  fileName: string;
  url: string;
}

export class FakeUploader extends Uploader {
  public uploads: Upload[] = [];

  public async upload({ fileName }: UploadParams): Promise<{ url: string }> {
    const url = randomUUID();

    this.uploads.push({
      fileName,
      url,
    });

    return {
      url,
    };
  }
}
