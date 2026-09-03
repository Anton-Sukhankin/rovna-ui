import React from 'react';
import omit from 'lodash/omit';
import { Radio } from '@rovna-ui/components/primitives';
import { Form } from '@rovna-ui/components/components/Form';

import { useDisabled } from '@rovna-internal/filters/hooks/useDisabled';
import { useValuesObserver } from '@rovna-internal/filters/hooks/useValuesObserver';

import { RadioFilterProps } from './types';

const RadioFilter = (props: RadioFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
  const disabled = useDisabled(props, values);

  return <Radio disabled={disabled} {...omit(props, ['config', 'INTERNAL_scope'])} />;
};

export { RadioFilter };
