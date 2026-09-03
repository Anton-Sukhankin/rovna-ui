import React from 'react';

import { ToggleButtonGroupProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ToggleButtonGroupContextType<T = any> = {
  onChange?: ToggleButtonGroupProps<T>['onChange'];
  disabled?: boolean;
};
export const ToggleButtonGroupContext = React.createContext<
  ToggleButtonGroupContextType | undefined
>(undefined);
export const useToggleButtonGroupContext = <T>() => {
  const ctx = React.useContext(ToggleButtonGroupContext);

  return ctx as ToggleButtonGroupContextType<T> | undefined;
};
