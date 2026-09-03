import React from 'react';

type InitialState = boolean | (() => boolean);

export const useBoolean = (initialState: InitialState = false) => {
  const [value, setValue] = React.useState(initialState);

  const setter = React.useCallback((value?: boolean) => {
    if (typeof value === 'boolean') {
      setValue(value);

      return;
    }

    setValue(prev => !prev);
  }, []);

  return [value, setter] as const;
};
