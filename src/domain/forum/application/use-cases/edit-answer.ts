import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment';
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository';
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Injectable } from '@nestjs/common';

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  attachmentIds: string[];
  content: string;
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

@Injectable()
export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    attachmentIds,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId);

    const answerAttchmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    );

    const questionAttachments = attachmentIds.map((id) =>
      AnswerAttachment.create({
        attachmentId: new UniqueEntityID(id),
        answerId: answer.id,
      }),
    );

    answerAttchmentList.update(questionAttachments);

    answer.content = content;
    answer.attachments = answerAttchmentList;

    await this.answersRepository.save(answer);

    return right({
      answer,
    });
  }
}
