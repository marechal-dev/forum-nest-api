import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { hash } from 'bcrypt';

import request from 'supertest';
import { StudentFactory } from 'test/factories/make-student';

describe('Authenticate Controller E2E Test Suite Case', () => {
  let app: INestApplication;
  let studentFactory: StudentFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    studentFactory = moduleRef.get(StudentFactory);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[POST] /sessions', async () => {
    const email = 'johndoe@example.com';
    const password = '1234567';
    const passwordHash = await hash(password, 8);

    await studentFactory.makePrismaStudent({
      name: 'John Doe',
      email,
      password: passwordHash,
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
