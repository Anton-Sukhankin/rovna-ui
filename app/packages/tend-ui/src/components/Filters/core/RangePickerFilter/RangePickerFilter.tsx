import React from 'react';
import omit from 'lodash/omit';

import { RangePicker } from '@rovna-internal/components/primitives/RangePicker';
import { Form } from '@rovna-internal/components/components/Form';
import { useDisabled } from '@rovna-internal/components/components/Filters/hooks/useDisabled';

import { useValuesObserver } from '../../hooks/useValuesObserver';
import { RangePickerFilterProps } from './types';

const RangePickerFilter = (props: RangePickerFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
  const disabled = useDisabled(props, values);

  return <RangePicker fullWidth disabled={disabled} {...omit(props, 'config')} />;
};

export { RangePickerFilter };
