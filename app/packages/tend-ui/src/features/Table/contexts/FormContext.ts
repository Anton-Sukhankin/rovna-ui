import { contextFactory } from '@rovna-internal/components/factories/contextFactory';
import { FormInstance } from '@rovna-internal/components/components/Form';
import { TableForm } from '@rovna-internal/components/features/Table/types';

type FormContextType = {
  form: FormInstance<TableForm>;
};
const [FormContext, useFormContext] =
  contextFactory<FormContextType>('Table.FormContext');

export { FormContext, useFormContext };
export type { FormContextType };
