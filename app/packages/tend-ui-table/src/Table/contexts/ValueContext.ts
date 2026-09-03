import React from 'react';
import { GenericObject } from '@rovna-ui/types';

import { TableForm } from '@rovna-internal/table/Table/types';

type ValueContextType<T extends GenericObject = GenericObject> = Partial<TableForm<T>>;

const ValueContext = React.createContext<ValueContextType | undefined>(undefined);
const useValueContext = <T extends GenericObject = GenericObject>() =>
  React.useContext(ValueContext) as ValueContextType<T>;

export { ValueContext, useValueContext };
export type { ValueContextType };
