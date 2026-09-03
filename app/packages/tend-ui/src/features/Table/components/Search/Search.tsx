import React from 'react';

import { Search as DefaultSearch } from '@rovna-internal/components/components/Search';
import { Form } from '@rovna-internal/components/components/Form';
import { FormName } from '@rovna-internal/components/features/Table/consts';
import { useTableForm } from '@rovna-internal/components/features/Table/hooks/useTableForm';

import { SearchProps } from './types';

export const Search = (props: SearchProps) => {
  const { form } = useTableForm();

  return (
    <Form component={false} form={form} name={FormName.Search}>
      <Form.Item noStyle name='search'>
        <DefaultSearch style={{ width: '256px' }} {...props} />
      </Form.Item>
    </Form>
  );
};
