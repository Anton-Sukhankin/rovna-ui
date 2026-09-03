import React from 'react';

import { FormInstanceParameters, FormModel } from '@rovna-internal/form/core/classes/FormModel';

export type UseFormParameters<S extends object = object> = FormInstanceParameters<S>;
/**
 *
 * @param parameters - `UseFormParameters<State>`
 * @returns `FormInstance<State>`
 */
export const useForm = <S extends object = object>(parameters?: UseFormParameters<S>) => {
  const ref = React.useRef(
    new FormModel({
      values: parameters?.values,
      defaultValues: parameters?.defaultValues,
      onChange: parameters?.onChange,
      onSubmit: parameters?.onSubmit,
    }),
  );

  if (typeof parameters?.values !== 'undefined') {
    ref.current.__proxy(parameters.values);
  }

  return ref.current;
};
