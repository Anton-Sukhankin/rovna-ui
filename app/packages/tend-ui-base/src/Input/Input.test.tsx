import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { Input } from './Input';

describe('Input', () => {
  it('forwards native input properties and events', () => {
    const onChange = jest.fn();
    const renderer = render(
      <Input aria-label='Название' defaultValue='Черновик' onChange={onChange} />,
    );
    const input = renderer.getByRole('textbox', { name: 'Название' });

    expect(input).toHaveValue('Черновик');

    fireEvent.change(input, { target: { value: 'Готово' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('Готово');
  });
});
