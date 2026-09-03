import React from 'react';
import omit from 'lodash/omit';

import { Checkbox } from '@rovna-internal/components/primitives/Checkbox';
import { Form } from '@rovna-internal/components/components/Form';
import { useDisabled } from '@rovna-internal/components/components/Filters/hooks/useDisabled';

import { CheckboxGroupFilterProps } from './types';
import { useValuesObserver } from '../../hooks/useValuesObserver';

const CheckboxGroupFilter = (props: CheckboxGroupFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
  const disabled = useDisabled(props, values);

  return (
    <Checkbox.Group layout='vertical' disabled={disabled} {...omit(props, 'config')} />
  );
};

export { CheckboxGroupFilter };
