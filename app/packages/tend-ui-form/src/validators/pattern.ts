import { Any } from '@rovna-ui/types';

import { Validator } from '@rovna-internal/form/core/interfaces';
import { ValidationRule } from '@rovna-internal/form/core';

export const pattern: Validator = (value: Any, rule: ValidationRule) => {
  if (typeof rule.pattern === 'undefined') return Promise.resolve();

  if (rule.pattern.test(value)) return Promise.resolve();

  return Promise.reject();
};
