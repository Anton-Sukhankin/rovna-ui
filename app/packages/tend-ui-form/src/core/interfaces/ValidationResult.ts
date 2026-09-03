import { Any } from '@rovna-ui/types';

export type ValidationResult = {
  status: 'validating' | 'success' | 'error' | 'warning';
  name: string[];
  message?: string;
  value: Any;
};
