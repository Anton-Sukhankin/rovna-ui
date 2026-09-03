import React from 'react';
import omit from 'lodash/omit';

import { DatePicker } from '@rovna-internal/components/primitives/DatePicker';
import { Form } from '@rovna-internal/components/components/Form';
import { useDisabled } from '@rovna-internal/components/components/Filters/hooks/useDisabled';

import { DatePickerFilterProps } from './types';
import { useValuesObserver } from '../../hooks/useValuesObserver';

const DatePickerFilter = (props: DatePickerFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
  const disabled = useDisabled(props, values);

  return <DatePicker fullWidth disabled={disabled} {...omit(props, 'config')} />;
};

export { DatePickerFilter };
