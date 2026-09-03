import React from 'react';
import omit from 'lodash/omit';
import { Form } from '@rovna-ui/components/components/Form';
import { RangeInput } from '@rovna-ui/primitives';

import { useDisabled } from '@rovna-internal/filters/hooks/useDisabled';
import { useValuesObserver } from '@rovna-internal/filters/hooks/useValuesObserver';

import { RangeInputFilterProps } from './types';

const RangeInputFilter = (props: RangeInputFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);

  const disabled = useDisabled(props, values);

  return (
    <RangeInput disabled={disabled} {...omit(props, ['config', 'INTERNAL_scope'])} />
  );
};

export { RangeInputFilter };
