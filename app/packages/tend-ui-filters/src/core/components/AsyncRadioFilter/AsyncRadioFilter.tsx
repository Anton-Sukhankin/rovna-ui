import React from 'react';
import omit from 'lodash/omit';
import { isString } from '@rovna-ui/utils';
import { AsyncRadio } from '@rovna-ui/components/components';
import { Form } from '@rovna-ui/components/components/Form';

import { useDepends, useDisabled, useValuesObserver } from '@rovna-internal/filters/hooks';

import { AsyncRadioFilterProps } from './types';

const AsyncRadioFilter = (props: AsyncRadioFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
  const disabled = useDisabled(props, values);
  const _query = useDepends(props, values);
  const api = React.useMemo(() => {
    const query = JSON.parse(_query);
    if (isString(props.api)) return { url: props.api, query };
    if (typeof props.api === 'function') return { fn: props.api, query };

    return { ...props.api, query };
  }, [props.api, _query]);

  return (
    <AsyncRadio
      disabled={disabled}
      {...omit(props, ['config', 'INTERNAL_scope'])}
      api={api}
    />
  );
};

AsyncRadioFilter.displayName = 'Filter.AsyncRadioFilter';

export { AsyncRadioFilter };
