import React from 'react';
import omit from 'lodash/omit';

import { Radio } from '@rovna-internal/components/primitives/Radio';
import { Form } from '@rovna-internal/components/components/Form';
import { useDisabled } from '@rovna-internal/components/components/Filters/hooks/useDisabled';

import { RadioGroupFilterProps } from './types';
import { useValuesObserver } from '../../hooks/useValuesObserver';

const RadioGroupFilter = (props: RadioGroupFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
  const disabled = useDisabled(props, values);

  return <Radio.Group layout='vertical' disabled={disabled} {...omit(props, 'config')} />;
};

export { RadioGroupFilter };
