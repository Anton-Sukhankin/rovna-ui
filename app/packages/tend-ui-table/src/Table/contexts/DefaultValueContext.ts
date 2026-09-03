import React from 'react';
import { GenericObject } from '@rovna-ui/types';

import { TableForm } from '@rovna-internal/table/Table/types';

type DefaultValueContextType<T extends GenericObject = GenericObject> = Partial<
  TableForm<T>
>;

const DefaultValueContext = React.createContext<DefaultValueContextType | undefined>(
  undefined,
);
const useDefaultValueContext = <T extends GenericObject = GenericObject>() =>
  React.useContext(DefaultValueContext) as DefaultValueContextType<T>;

export { DefaultValueContext, useDefaultValueContext };
export type { DefaultValueContextType };
