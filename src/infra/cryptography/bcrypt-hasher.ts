import { Injectable } from '@nestjs/common';

import { hash, compare } from 'bcrypt';

import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator';

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  private readonly numberOfRounds = 8;

  public async hash(plain: string): Promise<string> {
    return hash(plain, this.numberOfRounds);
  }

  public async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
