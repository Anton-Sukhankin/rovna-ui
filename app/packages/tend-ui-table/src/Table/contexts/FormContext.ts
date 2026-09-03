import { contextFactory } from '@rovna-ui/factories';
import { FormInstance } from '@rovna-ui/components/components/Form';

import { TableForm } from '@rovna-internal/table/Table/types';

type FormContextType = {
  form: FormInstance<TableForm>;
};
const [FormContext, useFormContext] =
  contextFactory<FormContextType>('Table.FormContext');

export { FormContext, useFormContext };
export type { FormContextType };
