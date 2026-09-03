import React from 'react';

import { TableForm } from '@rovna-internal/components/features/Table/types';
import { GenericObject } from '@rovna-internal/components/types';

type ValueContextType<T extends GenericObject = GenericObject> = Partial<TableForm<T>>;

const ValueContext = React.createContext<ValueContextType | undefined>(undefined);
const useValueContext = <T extends GenericObject = GenericObject>() =>
  React.useContext(ValueContext) as ValueContextType<T>;

export { ValueContext, useValueContext };
export type { ValueContextType };
