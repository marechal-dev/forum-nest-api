import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository';
import { FakeUploader } from 'test/storage/fake-uploader';
import { expect } from 'vitest';
import { InvalidAttachmentType } from './errors/invalid-attachment-type';
import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachment';

let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;
let fakeUploader: FakeUploader;

let systemUnderTest: UploadAndCreateAttachmentUseCase;

describe('Upload and Create Attachment Test Suite', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository();
    fakeUploader = new FakeUploader();

    systemUnderTest = new UploadAndCreateAttachmentUseCase(
      inMemoryAttachmentsRepository,
      fakeUploader,
    );
  });

  it('should be able to upload and create a new attachment', async () => {
    const result = await systemUnderTest.execute({
      fileName: 'profile.png',
      fileType: 'image/png',
      body: Buffer.from(''),
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      attachment: inMemoryAttachmentsRepository.items[0],
    });
    expect(fakeUploader.uploads).toHaveLength(1);
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'profile.png',
      }),
    );
  });

  it('should not be able to upload an attachment with invalid file type', async () => {
    const result = await systemUnderTest.execute({
      fileName: 'profile.mp3',
      fileType: 'audio/mpeg',
      body: Buffer.from(''),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidAttachmentType);
  });
});
