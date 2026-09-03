import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { TimeSelect } from './TimeSelect';

describe('TimeSelect', () => {
  it('provides a Russian accessible name without stale popup references', async () => {
    const renderer = render(<TimeSelect />);
    const combobox = renderer.getByRole('combobox');

    expect(combobox).toHaveAccessibleName('Выбор времени');
    expect(renderer.getByTestId('rovna-ui-timeselect')).not.toHaveAttribute('aria-label');
    await waitFor(() => {
      expect(combobox).not.toHaveAttribute('aria-controls');
      expect(combobox).not.toHaveAttribute('aria-owns');
    });
  });
});
