import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  public constructor() {
    super({
      log: ['warn', 'error', 'query'],
    });
  }

  public onModuleInit() {
    return this.$connect();
  }

  public onModuleDestroy() {
    return this.$disconnect();
  }
}
