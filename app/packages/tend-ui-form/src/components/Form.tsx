import React from 'react';
import { Form as _Form } from '@rovna-ui/primitives';

import { FormProvider } from '@rovna-internal/form/contexts';

import { FormProps } from './types';
import { Field } from './Field';

const Form = <State extends object = object>({
  headless = false,
  children,
  form,
  ...props
}: FormProps<State>) => {
  const handleSubmit = React.useCallback(
    e => {
      e.preventDefault();
      form.submit();
    },
    [form],
  );

  return (
    <FormProvider headless={headless} form={form}>
      {headless ? (
        children
      ) : (
        <_Form onSubmit={handleSubmit} {...props}>
          {children}
        </_Form>
      )}
    </FormProvider>
  );
};

Form.displayName = 'Form';
Form.Field = Field;

export { Form };
