export class StorybookHttpError extends Error {
  readonly status: number;

  constructor(status: number, message = `HTTP ${status}`) {
    super(message);
    this.name = 'StorybookHttpError';
    this.status = status;
  }
}

export class StorybookTimeoutError extends Error {
  constructor(message = 'Локальный сценарий превысил время ожидания') {
    super(message);
    this.name = 'StorybookTimeoutError';
  }
}

export const resolveFixture = <T,>(value: T): Promise<T> => Promise.resolve(value);

export const rejectFixture = <T = never>(error: Error): Promise<T> =>
  Promise.reject(error);

export const pendingFixture = <T,>(): Promise<T> => new Promise<T>(() => undefined);

export const timeoutFixture = <T = never>(): Promise<T> =>
  rejectFixture(new StorybookTimeoutError());

export const unauthorizedFixture = <T = never>(): Promise<T> =>
  rejectFixture(new StorybookHttpError(401, 'Требуется авторизация'));

export const retryFixture = <T,>(value: T, failures = 1) => {
  let attempts = 0;

  return (): Promise<T> => {
    attempts += 1;
    if (attempts <= failures) {
      return rejectFixture(new Error(`Локальная ошибка, попытка ${attempts}`));
    }

    return resolveFixture(value);
  };
};
