import { createContext } from '@rovna-ui/factories';

import { FormInstance } from '@rovna-internal/components/components/Form';
import { GenericObject } from '@rovna-internal/components/types';

interface FiltersFormProviderValue {
  form: FormInstance<GenericObject>;
  getScopedState: () => GenericObject;
  onClear?: (name: string) => void;
  onReset?: () => void;
}

export const [FiltersFormProvider, useFiltersFormProvider] =
  createContext<FiltersFormProviderValue>('FiltersFormProvider');
