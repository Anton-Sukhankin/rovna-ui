import React from 'react';

import { FormModel, ValidationResult } from '@rovna-internal/form/core';

export const useValidationResult = <T extends object = object>(
  form: FormModel<T>,
  path: string | string[],
) => {
  const [result, setValidationResult] = React.useState<ValidationResult | null>(null);

  React.useEffect(
    () =>
      form.__onValidation(path, error => {
        setValidationResult(error);
      }),
    [form, path],
  );

  return result;
};
