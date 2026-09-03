import { Any } from '@rovna-ui/types';

import { Validator } from '@rovna-internal/form/core/interfaces';
import { ValidationRule } from '@rovna-internal/form/core';

export const min: Validator = (value: Any, rule: ValidationRule) => {
  if (typeof rule.min === 'undefined') return Promise.resolve();

  if (typeof value === 'undefined') {
    return Promise.reject(rule.message);
  }
  if (Array.isArray(value) && value.length < rule.min) {
    return Promise.reject(rule.message);
  }
  if (typeof value === 'number' && Number(value) < rule.min) {
    return Promise.reject(rule.message);
  }
  if (typeof value === 'string' && String(value).length < rule.min) {
    return Promise.reject(rule.message);
  }

  return Promise.resolve();
};
