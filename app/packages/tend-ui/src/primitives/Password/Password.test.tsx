import React from 'react';
import { render } from '@testing-library/react';

import { Password } from './Password';

describe('Password', () => {
  it('provides an accessible name for the clear action', () => {
    const renderer = render(
      <Password aria-label='Пароль' allowClear defaultValue='Секрет' />,
    );

    expect(renderer.getByLabelText('Пароль')).toHaveAttribute('type', 'password');
    expect(renderer.getByRole('button', { name: 'Очистить поле' })).toBeInTheDocument();
  });
});
