/**
 * Error
 */
export class Left<TLeftValue, TRightValue> {
  public readonly value: TLeftValue;

  public constructor(value: TLeftValue) {
    this.value = value;
  }

  public isLeft(): this is Left<TLeftValue, TRightValue> {
    return true;
  }

  public isRight(): this is Right<TLeftValue, TRightValue> {
    return false;
  }
}

/**
 * Success
 */
export class Right<TLeftValue, TRightValue> {
  public readonly value: TRightValue;

  public constructor(value: TRightValue) {
    this.value = value;
  }

  public isLeft(): this is Left<TLeftValue, TRightValue> {
    return false;
  }

  public isRight(): this is Right<TLeftValue, TRightValue> {
    return true;
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>;

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value);
};

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value);
};
