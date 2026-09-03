import React from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { FormModel } from '@rovna-internal/form/core/classes/FormModel';

export const useRequires = <S extends object = object>(
  form: FormModel<S>,
  requires?: string[] | string[][],
): boolean => {
  const getSnapshot = React.useCallback(
    () => form.__hasRequired(requires),
    [form, requires],
  );

  const subscribe = React.useCallback(
    (callback: () => void) => form.__onRequireChange(requires, callback),
    [form, requires],
  );

  return useSyncExternalStore(subscribe, getSnapshot);
};
