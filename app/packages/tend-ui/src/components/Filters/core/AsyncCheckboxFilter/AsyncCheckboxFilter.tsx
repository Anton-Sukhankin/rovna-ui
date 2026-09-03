import React from 'react';
import omit from 'lodash/omit';
import { isString } from '@rovna-ui/utils/isString';

import { AsyncCheckbox } from '@rovna-internal/components/components/AsyncCheckbox';
import { Form } from '@rovna-internal/components/components/Form';
import {
  useDepends,
  useDisabled,
  useValuesObserver,
} from '@rovna-internal/components/components/Filters/hooks';

import { AsyncCheckboxFilterProps } from './types';

const AsyncCheckboxFilter = (props: AsyncCheckboxFilterProps) => {
  const form = Form.useFormInstance();
  const values = useValuesObserver(props.config.name, form, props.INTERNAL_scope);
  const disabled = useDisabled(props, values);
  const _query = useDepends(props, values);
  // TODO: Внести эту логику в AsyncSelect
  const api = React.useMemo(() => {
    const query = JSON.parse(_query);
    if (isString(props.api)) return { url: props.api, query };
    if (typeof props.api === 'function') return { fn: props.api, query };

    return { ...props.api, query };
  }, [props.api, _query]);

  return <AsyncCheckbox disabled={disabled} {...omit(props, 'config')} api={api} />;
};

AsyncCheckboxFilter.displayName = 'Filters.AsyncCheckboxFilter';

export { AsyncCheckboxFilter };
