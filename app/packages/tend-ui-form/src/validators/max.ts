import { Any } from '@rovna-ui/types';

import { ValidationRule, Validator } from '@rovna-internal/form/core/interfaces';

export const max: Validator = (value: Any, rule: ValidationRule) => {
  if (typeof rule.max === 'undefined') return Promise.resolve();

  if (typeof value === 'undefined') {
    return Promise.reject(rule.message);
  }
  if (Array.isArray(value) && value.length > rule.max) {
    return Promise.reject(rule.message);
  }
  if (typeof value === 'number' && Number(value) > rule.max) {
    return Promise.reject(rule.message);
  }
  if (typeof value === 'string' && String(value).length > rule.max) {
    return Promise.reject(rule.message);
  }

  return Promise.resolve();
};
