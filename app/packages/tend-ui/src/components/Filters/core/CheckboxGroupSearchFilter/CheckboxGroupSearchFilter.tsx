import React from 'react';
import omit from 'lodash/omit';

import { CheckboxGroupSearch } from '@rovna-internal/components/components/CheckboxGroupSearch';
import { Form } from '@rovna-internal/components/components/Form';
import { useDisabled } from '@rovna-internal/components/components/Filters/hooks/useDisabled';

import { CheckboxGroupSearchFilterProps } from './types';
import { useValuesObserver } from '../../hooks/useValuesObserver';

const CheckboxGroupSearchFilter = (props: CheckboxGroupSearchFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
  const disabled = useDisabled(props, values);

  return (
    <CheckboxGroupSearch
      layout='vertical'
      disabled={disabled}
      {...omit(props, 'config')}
    />
  );
};

export { CheckboxGroupSearchFilter };
