import React from 'react';

import { useFormContext } from '@rovna-internal/components/features/Table/contexts/FormContext';

/**
 * @deprecated Устарело. Не использовать в продакшене
 */
export const useTableForm = () => {
  const { form } = useFormContext();
  const model = React.useMemo(() => ({ form }), [form]);

  return model;
};
