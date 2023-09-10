import { RegisterStudentUseCase } from './register-student';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { FakeHasher } from 'test/cryptography/fake-hasher';

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let systemUnderTest: RegisterStudentUseCase;

describe('Register Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    fakeHasher = new FakeHasher();

    systemUnderTest = new RegisterStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
    );
  });

  it('should be able to register a new student', async () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    };

    const result = await systemUnderTest.execute(data);

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    });
  });

  it('should be hash student password upon registration', async () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    };

    const result = await systemUnderTest.execute(data);

    expect(result.isRight()).toBe(true);
    expect(inMemoryStudentsRepository.items[0].password).toEqual(
      data.password.concat('-hashed'),
    );
  });
});
