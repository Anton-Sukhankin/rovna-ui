import { Form } from '@rovna-ui/components/components/Form';
import { GenericObject } from '@rovna-ui/types';

import { TableForm } from '@rovna-internal/table/Table/types';

export const useTable = <TFilter extends GenericObject = GenericObject>() => {
  const [form] = Form.useForm<TableForm<TFilter>>();

  return { form };
};
