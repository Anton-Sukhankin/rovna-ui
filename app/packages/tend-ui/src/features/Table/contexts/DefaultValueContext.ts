import React from 'react';

import { TableForm } from '@rovna-internal/components/features/Table/types';
import { GenericObject } from '@rovna-internal/components/types';

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
