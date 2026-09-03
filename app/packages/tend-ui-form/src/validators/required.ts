import { Validator } from '@rovna-internal/form/core/interfaces';

export const required: Validator = <T>(value: T) => {
  if (typeof value === 'undefined') {
    return Promise.reject();
  }

  if (Array.isArray(value) && value.length === 0) {
    return Promise.reject();
  }

  if (!value && typeof value !== 'boolean') {
    return Promise.reject();
  }

  return Promise.resolve();
};
