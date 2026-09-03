import React from 'react';
import AntForm from 'antd-core/es/form';

import { Item } from './components/Item';
import { FormComponent, FormProps, FormRef } from './types';
import { Root } from './styled';

const BaseForm = <T,>(
  { layout = 'vertical', gap, ...props }: FormProps<T>,
  ref: React.ForwardedRef<FormRef<T>>,
) => {
  return (
    <Root data-testid='rovna-ui-form' {...props} ref={ref} $gap={gap} layout={layout} />
  );
};
const ForwardedForm = React.forwardRef(BaseForm) as FormComponent;
const Form = Object.assign(ForwardedForm, {
  Item,
  useForm: AntForm.useForm,
  useFormInstance: AntForm.useFormInstance,
  useWatch: AntForm.useWatch,
  ErrorList: AntForm.ErrorList,
  List: AntForm.List,
  Provider: AntForm.Provider,
  displayName: 'Form',
});

export { Form };
