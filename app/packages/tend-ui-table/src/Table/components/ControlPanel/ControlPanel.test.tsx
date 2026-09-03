import React from 'react';
import { render } from '@testing-library/react';

import { Root } from '@rovna-internal/table/Table';
import { Search } from '@rovna-internal/table/Table/components/Search';

import { ControlPanel } from './ControlPanel';

describe('Table accessibility names', () => {
  it('provides Russian names for icon-only controls and search', () => {
    const renderer = render(
      <Root>
        <ControlPanel
          moreButtonProps={{ items: [{ key: 'action', label: 'Действие' }] }}
        />
        <Search />
      </Root>,
    );

    expect(renderer.getByRole('button', { name: 'Сортировка таблицы' })).toBeTruthy();
    expect(renderer.getByRole('button', { name: 'Настройки таблицы' })).toBeTruthy();
    expect(
      renderer.getByRole('button', { name: 'Дополнительные действия с таблицей' }),
    ).toBeTruthy();
    expect(renderer.getByRole('textbox', { name: 'Поиск по таблице' })).toBeTruthy();
  });
});
