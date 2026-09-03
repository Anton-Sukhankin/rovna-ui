import { useFormProvider } from '@rovna-internal/form/contexts';

export const useInstance = () => {
  const context = useFormProvider('useInstance');

  const {
    getField,
    getFields,
    resetField,
    resetFields,
    setField,
    setFields,
    submit,
    validateField,
    validateFields,
  } = context.form;

  return {
    getField,
    getFields,
    resetField,
    resetFields,
    setField,
    setFields,
    submit,
    validateField,
    validateFields,
  };
};
