import React from 'react';
import { render } from '@testing-library/react';

import { Search } from './Search';

describe('Search', () => {
  it('names the field and clear action in Russian', () => {
    const renderer = render(<Search allowClear defaultValue='Запрос' />);

    expect(renderer.getByRole('textbox')).toHaveAccessibleName('Поиск');
    expect(
      renderer.getByRole('button', { name: 'Очистить поле поиска' }),
    ).toBeInTheDocument();
  });

  it('uses the supplied accessible name', () => {
    const renderer = render(<Search aria-label='Поиск сотрудника' />);

    expect(renderer.getByRole('textbox')).toHaveAccessibleName('Поиск сотрудника');
  });
});
