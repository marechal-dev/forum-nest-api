import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';

@Injectable()
export class EnvService {
  public constructor(
    private readonly configService: ConfigService<Env, true>,
  ) {}

  public get<T extends keyof Env>(key: T) {
    return this.configService.get(key, { infer: true });
  }
}
