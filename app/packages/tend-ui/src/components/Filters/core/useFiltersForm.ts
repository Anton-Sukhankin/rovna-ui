import pick from 'lodash/pick';
import { isString } from '@rovna-ui/utils';

import { GenericObject } from '@rovna-internal/components/types';
import { useCallbackRef } from '@rovna-internal/components/hooks/useCallbackRef';
import { Form, FormInstance } from '@rovna-internal/components/components/Form';

import { pack } from '../utils';

export const useFiltersForm = <T extends GenericObject = GenericObject>(
  form?: FormInstance<T>,
  scope?: string,
) => {
  const [state] = Form.useForm<T>(form);

  const getScopeState = useCallbackRef(() => {
    const result = scope ? state.getFieldValue([scope]) : state.getFieldsValue();

    return result;
  });

  const getState = useCallbackRef(() => {
    const result = state.getFieldsValue();

    return result;
  });

  const get = useCallbackRef<<R = unknown>(name: string) => R>(name => {
    const path = scope ? [scope, name] : [name];
    const result = state.getFieldValue(path);

    return result;
  });

  const set = useCallbackRef((name: string, payload: unknown) => {
    const path = scope ? [scope, name] : [name];
    state.setFieldValue(path, payload);
  });

  const fill = useCallbackRef((payload: T) => {
    state.resetFields();
    state.setFieldsValue(pack(payload, scope));
  });

  const clear = useCallbackRef((name: string) => {
    const path = scope ? [scope, name] : [name];
    state.setFieldValue(path, undefined);
    const values = state.getFieldsValue();
    const touched = pick<T>(values, path.join('.'));

    return [touched, values] as const;
  });

  const reset = useCallbackRef(() => {
    const path = [scope].filter(isString);
    state.resetFields(path.length ? path : undefined);
    const values = state.getFieldsValue();

    return values;
  });

  return { set, clear, reset, get, getState, form: state, fill, getScopeState };
};
