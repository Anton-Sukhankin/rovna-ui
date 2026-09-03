import React from 'react';

type ContextType<T extends string = string> = {
  onItemClick?: (value?: T) => void;
};
/**
 * @internal Not for public usage
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ListContext = React.createContext<ContextType<any> | undefined>(undefined);

/**
 * @internal Not for public usage
 */
export const useListContext = <T extends string = string>() => {
  return React.useContext(ListContext) as ContextType<T> | undefined;
};
