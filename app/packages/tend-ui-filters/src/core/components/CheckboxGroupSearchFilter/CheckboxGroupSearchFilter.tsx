import React from 'react';
import omit from 'lodash/omit';
import { CheckboxGroupSearch } from '@rovna-ui/components/components';
import { Form } from '@rovna-ui/components/components/Form';

import { useDisabled } from '@rovna-internal/filters/hooks/useDisabled';
import { useValuesObserver } from '@rovna-internal/filters/hooks/useValuesObserver';

import { CheckboxGroupSearchFilterProps } from './types';

const CheckboxGroupSearchFilter = (props: CheckboxGroupSearchFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
  const disabled = useDisabled(props, values);

  return (
    <CheckboxGroupSearch
      layout='vertical'
      disabled={disabled}
      {...omit(props, ['config', 'INTERNAL_scope'])}
    />
  );
};

export { CheckboxGroupSearchFilter };
