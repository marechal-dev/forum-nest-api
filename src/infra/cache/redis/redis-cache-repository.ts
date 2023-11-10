import { Injectable } from '@nestjs/common';
import { CacheRepository } from '../cache-repository';
import { RedisService } from './redis.service';

@Injectable()
export class RedisCacheRepository implements CacheRepository {
  public constructor(private readonly redis: RedisService) {}

  public async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value, 'EX', 60 * 15);
  }

  public get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  public async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
