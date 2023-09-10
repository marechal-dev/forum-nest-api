import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator';

export class FakeHasher implements HashGenerator, HashComparer {
  public async hash(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }

  public async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash;
  }
}
