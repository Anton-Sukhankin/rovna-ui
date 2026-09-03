import React from 'react';
import dayjs from 'dayjs';

import { Form } from '@rovna-internal/components/components/Form';

export const useFilterCounter = (name: string | string[]) => {
  const form = Form.useFormInstance();
  const value = Form.useWatch<
    string | number | dayjs.Dayjs | ArrayLike<unknown> | undefined
  >(name, form);

  return React.useMemo(() => {
    if (!value) return;
    if (Array.isArray(value)) return value.length;

    return 1;
  }, [value]);
};
