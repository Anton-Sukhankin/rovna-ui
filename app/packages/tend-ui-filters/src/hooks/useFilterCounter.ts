import React from 'react';
import dayjs from 'dayjs';
import { Form } from '@rovna-ui/components/components/Form';
import { isNumber } from '@rovna-ui/utils';

type FilterValue = string | number | dayjs.Dayjs | ArrayLike<unknown> | undefined;

export const useFilterCounter = (name: string | string[]) => {
  const form = Form.useFormInstance();
  const value = Form.useWatch<FilterValue>(name, form);

  return React.useMemo(() => {
    if (isNumber(value)) return 1;
    if (!value) return 0;
    if (Array.isArray(value))
      return value.some(v => Boolean(v) || isNumber(v)) ? value.length : 0;

    return 1;
  }, [value]);
};
