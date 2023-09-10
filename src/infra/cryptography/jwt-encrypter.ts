import { Injectable } from '@nestjs/common';
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtEncrypter implements Encrypter {
  public constructor(private readonly jwtService: JwtService) {}

  public async encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
