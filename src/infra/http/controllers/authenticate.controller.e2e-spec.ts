import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { hash } from 'bcrypt';

import request from 'supertest';

describe('Authenticate Controller E2E Test Suite Case', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[POST] /sessions', async () => {
    const email = 'johndoe@example.com';
    const password = '1234567';
    const passwordHash = await hash(password, 8);

    await prisma.user.create({
      data: {
        name: 'John Doe',
        email,
        password: passwordHash,
      },
    });

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email,
      password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    });
  });
});
