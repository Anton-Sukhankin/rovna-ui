import { Form } from '@rovna-internal/components/components/Form';
import { TableForm } from '@rovna-internal/components/features/Table/types';
import { GenericObject } from '@rovna-internal/components/types/GenericObject';

export const useTable = <TFilter extends GenericObject = GenericObject>() => {
  const [form] = Form.useForm<TableForm<TFilter>>();

  return { form };
};
