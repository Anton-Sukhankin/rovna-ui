import { createContext } from '@rovna-ui/factories';

export const [FieldProvider, useFieldProvider] = createContext<{
  status?: 'error' | 'warning';
}>('FieldProvider');
