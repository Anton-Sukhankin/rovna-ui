import React from 'react';
import { isUndefined } from '@rovna-ui/utils';

import { useCallbackRef } from '@rovna-internal/hooks/useCallbackRef';

import { UseControllableStateParameters, UseUncontrolledStateParameters } from './types';
import { useUpdateLayoutEffect } from '../useUpdateLayoutEffect';

type Setter<T> = (state?: T) => T;

/**
 * @internal Не для публичного использования
 */
const useUncontrolledState = <T>({
  defaultValue,
  onChange,
}: UseUncontrolledStateParameters<T>) => {
  const state = React.useState<T | undefined>(defaultValue);
  const [value] = state;
  const previous = React.useRef(value);
  const change = useCallbackRef(onChange);

  React.useEffect(() => {
    if (previous.current === value) return;
    change(value as T);
    previous.current = value;
  }, [value, previous, change]);

  return state;
};

/**
 * @deprecated Используйте UNSTABLE_useControllableStateV2
 * TODO: Удалить, заменить хуком UNSTABLE_useControllableStateV2
 */
const useControllableState = <T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateParameters<T>) => {
  const [_value, _setValue] = useUncontrolledState({
    defaultValue,
    onChange,
  });
  const isControlled = value !== undefined;
  const __value = isControlled ? value : _value;
  const update = useCallbackRef(onChange);

  const setter = React.useCallback<React.Dispatch<React.SetStateAction<T | undefined>>>(
    previous => {
      if (isControlled) {
        const setter = previous as Setter<T>;
        const next = typeof previous === 'function' ? setter(value) : previous;
        if (next !== value) update(next as T);
      } else {
        _setValue(previous);
      }
    },
    [isControlled, value, _setValue, update],
  );

  return [__value, setter] as const;
};

/**
 * Универсальный хук, позволяющий создавать управляемый/неуправляемый стейт
 * TODO: Переименовать в useControllableState так как хук рабочий и финальный
 */
const UNSTABLE_useControllableStateV2 = <T>(
  parameters: UseControllableStateParameters<T>,
) => {
  const __previous = React.useRef<T | undefined>(
    !isUndefined(parameters.value) ? parameters.value : parameters.defaultValue,
  );
  const [__value, __setValue] = React.useState<T | undefined>(() => {
    if (!isUndefined(parameters.value)) return parameters.value;

    return parameters.defaultValue;
  });
  const isControlled = parameters.value !== undefined;
  const value = parameters.value === undefined ? __value : parameters.value;
  const updater = useCallbackRef(parameters.onChange);

  React.useEffect(() => {
    if (__previous.current === __value) return;
    if (__value === undefined) return;
    updater(__value);
  }, [__value, updater]);

  /**
   * При переходе из контролируемого в неконтролируемый
   * сбрасываем состояние до undefined
   * Это нужно чтобы при сбросе через `form.resetFields()` из `antd`
   * стейт сбрасывался в undefined
   */
  useUpdateLayoutEffect(() => {
    if (parameters.value === undefined) {
      __setValue(undefined);
    }
  }, [parameters.value]);

  const setter = useCallbackRef<React.Dispatch<React.SetStateAction<T | undefined>>>(
    previous => {
      if (isControlled) {
        const setter = previous as Setter<T>;
        const next = typeof previous === 'function' ? setter(value) : previous;
        __setValue(next);
        __previous.current = value;
      } else {
        __setValue(previous);
        __previous.current = value;
      }
    },
  );

  return [value, setter] as const;
};

export {
  useControllableState,
  useUncontrolledState as UNSTABLE_useUncontrolledState,
  UNSTABLE_useControllableStateV2,
};
