import React from 'react';
import omit from 'lodash/omit';

import { Checkbox } from '@rovna-internal/components/primitives/Checkbox';
import { Form } from '@rovna-internal/components/components/Form';
import { useDisabled } from '@rovna-internal/components/components/Filters/hooks/useDisabled';

import { useValuesObserver } from '../../hooks/useValuesObserver';
import { CheckboxFilterProps } from './types';

const CheckboxFilter = (props: CheckboxFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
  const disabled = useDisabled(props, values);

  return <Checkbox disabled={disabled} {...omit(props, 'config')} />;
};

CheckboxFilter.displayName = 'Filters.CheckboxFilter';

export { CheckboxFilter };
