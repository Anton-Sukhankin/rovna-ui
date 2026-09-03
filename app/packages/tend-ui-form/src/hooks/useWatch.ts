import React from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { Any } from '@rovna-ui/types';

import { FormModel } from '@rovna-internal/form/core';

type Extractor<State> = (state: State) => Any;

/**
 * Позволяет подписываться на изменение состояния формы
 * @param form - Инстанс, возвращаемый хуком `useForm`
 * @param extractor - Строка, массив строк или callback-функция
 */
export const useWatch = <State extends object = object, R = Any>(
  form: FormModel<State>,
  extractor: string | string[] | Extractor<State>,
): R => {
  const getSnapshot = React.useCallback(() => {
    if (typeof extractor === 'function') return extractor(form.getFields());

    return form.getField(extractor);
  }, [form, extractor]);

  const subscribe = React.useCallback(
    (callback: () => void) => {
      if (typeof extractor === 'function') return form.__onFieldsChange(callback);

      return form.__onFieldChange(extractor, callback);
    },
    [form, extractor],
  );

  return useSyncExternalStore(subscribe, getSnapshot);
};
