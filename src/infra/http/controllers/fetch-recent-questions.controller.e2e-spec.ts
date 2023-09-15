import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import request from 'supertest';

import { hash } from 'bcrypt';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { StudentFactory } from 'test/factories/make-student';
import { QuestionFactory } from 'test/factories/make-question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

describe('Fetch Recent Questions Controller E2E Test Suite Case', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    studentFactory = moduleRef.get(StudentFactory);
    questionFactory = moduleRef.get(QuestionFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[GET] /questions', async () => {
    const email = 'johndoe@example.com';
    const password = '1234567';
    const passwordHash = await hash(password, 8);

    const user = await studentFactory.makePrismaStudent({
      name: 'John Doe',
      email,
      password: passwordHash,
    });

    const accessToken = jwt.sign({
      sub: user.id.toString(),
    });

    await Promise.all([
      questionFactory.makePrismaQuestion({
        title: 'Question 01',
        slug: Slug.create('question-01'),
        content: 'Question Content',
        authorId: user.id,
      }),
      questionFactory.makePrismaQuestion({
        title: 'Question 02',
        slug: Slug.create('question-02'),
        content: 'Question Content',
        authorId: user.id,
      }),
    ]);

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.questions).toHaveLength(2);
    expect(response.body).toEqual({
      questions: expect.arrayContaining([
        expect.objectContaining({
          title: 'Question 01',
        }),
        expect.objectContaining({
          title: 'Question 02',
        }),
      ]),
    });
  });
});
