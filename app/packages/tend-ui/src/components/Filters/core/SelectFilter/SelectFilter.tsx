import React from 'react';
import omit from 'lodash/omit';

import { Select } from '@rovna-internal/components/primitives/Select';
import { Form } from '@rovna-internal/components/components/Form';
import { useDisabled } from '@rovna-internal/components/components/Filters/hooks/useDisabled';

import { useValuesObserver } from '../../hooks/useValuesObserver';
import { SelectFilterProps } from './types';

const SelectFilter = (props: SelectFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
  const disabled = useDisabled(props, values);

  return <Select fullWidth disabled={disabled} {...omit(props, 'config')} />;
};

export { SelectFilter };
