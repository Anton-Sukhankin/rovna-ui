import { isBoolean } from '@rovna-ui/utils/isBoolean';
import debounceFn from 'lodash/debounce';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericFunction = (...parameters: any) => any;

export type DebounceOptions = {
  leading?: boolean;
  wait?: number;
  maxWait?: number;
  trailing?: boolean;
};

export const useDebouncedCallback = <T extends GenericFunction>(
  fn: T,
  debounce?: boolean | DebounceOptions,
) => {
  const callback = React.useMemo(() => {
    if (!isBoolean(debounce)) {
      const { wait = 300, ...options } = debounce || {};

      return debounceFn<T>(fn, wait, options);
    }

    if (!debounce) return fn;

    return debounceFn<T>(fn, 300);
  }, [debounce, fn]);

  React.useEffect(() => {
    return () => {
      const cancel = (callback as T & { cancel?: () => void }).cancel;
      cancel?.();
    };
  }, [callback]);

  return callback;
};
