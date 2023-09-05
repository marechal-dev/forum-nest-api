import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema } from './env';

import { PrismaService } from './prisma/prisma.service';

import { AuthModule } from './auth/auth.module';
import { CreateAccountController } from './controllers/create-account.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateQuestionController } from './controllers/create-question.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  providers: [PrismaService],
  controllers: [
    AuthenticateController,
    CreateAccountController,
    CreateQuestionController,
  ],
})
export class AppModule {}
