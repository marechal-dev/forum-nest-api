import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { hash } from 'bcrypt';

import request from 'supertest';

import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { StudentFactory } from 'test/factories/make-student';
import { DatabaseModule } from '@/infra/database/database.module';
import { QuestionFactory } from 'test/factories/make-question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';
import { AnswerFactory } from 'test/factories/make-answer';

describe('Edit Answer Controller E2E Test Suite Case', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let answerFactory: AnswerFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    studentFactory = moduleRef.get(StudentFactory);
    questionFactory = moduleRef.get(QuestionFactory);
    answerFactory = moduleRef.get(AnswerFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[PUT] /answers/:id', async () => {
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

    const question = await questionFactory.makePrismaQuestion({
      title: 'Question 1',
      slug: Slug.create('question-1'),
      authorId: user.id,
    });

    const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
    });

    const response = await request(app.getHttpServer())
      .put(`/answers/${answer.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'Edit Answer Content',
      });

    expect(response.statusCode).toBe(204);

    const questionOnDatabase = await prisma.answer.findFirst({
      where: {
        content: 'Edit Answer Content',
      },
    });

    expect(questionOnDatabase).toBeTruthy();
  });
});
