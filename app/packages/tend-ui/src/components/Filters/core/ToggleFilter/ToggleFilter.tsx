import React from 'react';
import omit from 'lodash/omit';

import { Toggle } from '@rovna-internal/components/primitives/Toggle';
import { Form } from '@rovna-internal/components/components/Form';
import { useDisabled } from '@rovna-internal/components/components/Filters/hooks/useDisabled';

import { useValuesObserver } from '../../hooks/useValuesObserver';
import { ToggleFilterProps } from './types';

const ToggleFilter = (props: ToggleFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
  const disabled = useDisabled(props, values);

  return <Toggle disabled={disabled} {...omit(props, 'config')} />;
};

export { ToggleFilter };
