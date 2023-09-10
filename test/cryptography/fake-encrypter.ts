import { Encrypter } from '@/domain/forum/application/cryptography/encrypter';

export class FakeEncrypter implements Encrypter {
  public async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}
