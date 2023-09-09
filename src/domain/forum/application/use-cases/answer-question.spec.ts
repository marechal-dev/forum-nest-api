import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let systemUnderTest: AnswerQuestionUseCase;

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    systemUnderTest = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it('should be able to create a answer', async () => {
    const result = await systemUnderTest.execute({
      questionId: '1',
      instructorId: '1',
      attachmentsIds: ['1', '2'],
      content: 'Conteúdo da resposta',
    });

    expect(result.isLeft()).toEqual(false);
    expect(result.isRight()).toEqual(true);
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems,
    ).toHaveLength(2);
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('2'),
        }),
      ],
    );
  });
});
