import { Either, left, right } from './either';

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10);
  }

  return left('error');
}

describe('Either Test Suite Case', () => {
  it('should return left', () => {
    const result = doSomething(false);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
  });

  it('should return right', () => {
    const result = doSomething(true);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
  });
});
