import React from 'react';
import omit from 'lodash/omit';

import { Input } from '@rovna-internal/components/primitives/Input';
import { Form } from '@rovna-internal/components/components/Form';
import { useDisabled } from '@rovna-internal/components/components/Filters/hooks/useDisabled';

import { InputFilterProps } from './types';
import { useValuesObserver } from '../../hooks/useValuesObserver';

const InputFilter = (props: InputFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);

  const disabled = useDisabled(props, values);

  return <Input disabled={disabled} {...omit(props, 'config')} />;
};

export { InputFilter };
