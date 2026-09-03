import React from 'react';
import { Search as _Search } from '@rovna-ui/components/components';
import { Form } from '@rovna-ui/components/components/Form';
import { INTERNAL_RovnaUILogger as RovnaUILogger } from '@rovna-ui/utils';

import { FormName } from '@rovna-internal/table/Table/consts';
import { useTableForm } from '@rovna-internal/table/Table/hooks/useTableForm';

import { SearchProps } from './types';

/**
 * @deprecated Компонент удален из дизайн системы и больше не поддерживается.
 * Используйте компонент `<Table.HotFilters />`
 */
export const Search = (props: SearchProps) => {
  if (process.env.NODE_ENV === 'development') {
    RovnaUILogger.warning([
      'Компонент "<Table.Search />" устарел и больше не поддерживается.',
      'Используйте "<Table.HotFilters />".',
    ]);
  }

  const { form } = useTableForm();

  return (
    <Form component={false} form={form} name={FormName.Search}>
      <Form.Item noStyle name='search'>
        <_Search aria-label='Поиск по таблице' style={{ width: '256px' }} {...props} />
      </Form.Item>
    </Form>
  );
};
