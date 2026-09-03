import React from 'react';

type Predicate<T> = (record: T) => boolean;
type RowClassName<T> = (record: T) => string;
type Options<T> = {
  onError?: Predicate<T>;
  onWarning?: Predicate<T>;
  onSuccess?: Predicate<T>;
};

export const useRowHighlighter = <T>(options?: Options<T>) => {
  return React.useCallback<RowClassName<T>>(
    record => {
      const isError = options?.onError?.(record);
      const isWarning = options?.onWarning?.(record);
      const isSuccess = options?.onSuccess?.(record);

      const [, className] =
        (
          [
            [isError, 'rovna-ui-table-row-error'],
            [isWarning, 'rovna-ui-table-row-warning'],
            [isSuccess, 'rovna-ui-table-row-success'],
          ] as const
        ).filter(([k]) => !!k)[0] || [];

      return className;
    },
    [options],
  );
};
