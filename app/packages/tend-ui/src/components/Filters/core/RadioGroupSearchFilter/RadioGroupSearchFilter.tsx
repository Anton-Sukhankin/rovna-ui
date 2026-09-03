import React from 'react';
import omit from 'lodash/omit';

import { RadioGroupSearch } from '@rovna-internal/components/components/RadioGroupSearch';
import { Form } from '@rovna-internal/components/components/Form';
import { useDisabled } from '@rovna-internal/components/components/Filters/hooks/useDisabled';

import { useValuesObserver } from '../../hooks/useValuesObserver';
import { RadioGroupSearchFilterProps } from './types';

const RadioGroupSearchFilter = (props: RadioGroupSearchFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
  const disabled = useDisabled(props, values);

  return (
    <RadioGroupSearch layout='vertical' disabled={disabled} {...omit(props, 'config')} />
  );
};

export { RadioGroupSearchFilter };
