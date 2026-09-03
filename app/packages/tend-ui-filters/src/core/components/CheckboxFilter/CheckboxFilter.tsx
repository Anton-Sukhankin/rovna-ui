import React from 'react';
import omit from 'lodash/omit';
import { Checkbox } from '@rovna-ui/components/primitives';
import { Form } from '@rovna-ui/components/components/Form';

import { useDisabled } from '@rovna-internal/filters/hooks/useDisabled';
import { useValuesObserver } from '@rovna-internal/filters/hooks/useValuesObserver';

import { CheckboxFilterProps } from './types';

const CheckboxFilter = (props: CheckboxFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
  const disabled = useDisabled(props, values);

  return <Checkbox disabled={disabled} {...omit(props, ['config', 'INTERNAL_scope'])} />;
};

CheckboxFilter.displayName = 'Filters.CheckboxFilter';

export { CheckboxFilter };
