import { FormValidator } from '../types';

export type CreateUploadMaxAttachmentsValidatorParameters = {
  max?: number;
};

export const createUploadMaxAttachmentsValidator = (
  options?: CreateUploadMaxAttachmentsValidatorParameters,
): FormValidator => {
  const max = options?.max ?? Infinity;

  return (_, value: ArrayLike<object>) => {
    const isError = value.length > max;
    if (isError) Promise.reject();

    return Promise.resolve();
  };
};
