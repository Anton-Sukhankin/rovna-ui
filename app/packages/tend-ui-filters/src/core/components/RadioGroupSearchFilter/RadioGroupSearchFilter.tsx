import React from 'react';
import omit from 'lodash/omit';
import { RadioGroupSearch } from '@rovna-ui/components/components';
import { Form } from '@rovna-ui/components/components/Form';

import { useDisabled } from '@rovna-internal/filters/hooks/useDisabled';
import { useValuesObserver } from '@rovna-internal/filters/hooks/useValuesObserver';

import { RadioGroupSearchFilterProps } from './types';

const RadioGroupSearchFilter = (props: RadioGroupSearchFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
  const disabled = useDisabled(props, values);

  return (
    <RadioGroupSearch
      layout='vertical'
      disabled={disabled}
      {...omit(props, ['config', 'INTERNAL_scope'])}
    />
  );
};

export { RadioGroupSearchFilter };
