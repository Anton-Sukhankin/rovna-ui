import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';

import { StackNavigation } from './StackNavigation';

describe('StackNavigation', () => {
  it('opens nested menu correctly', async () => {
    const onSelect = jest.fn();
    const renderer = render(
      <StackNavigation
        onSelect={onSelect}
        items={[
          { key: '1', label: 'Меню 1' },
          { key: '2', label: 'Меню 2', children: [{ key: '4', label: 'Меню 4' }] },
          { key: '3', label: 'Меню 3' },
        ]}
      />,
    );

    await waitFor(() => {
      expect(renderer.getByText(/Меню 1/)).toBeInTheDocument();
      expect(renderer.getByText(/Меню 2/)).toBeInTheDocument();
      expect(renderer.getByText(/Меню 3/)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(renderer.getByText(/Меню 1/));
    });

    await waitFor(() => {
      expect(onSelect).toHaveBeenLastCalledWith(['1']);
    });

    act(() => {
      fireEvent.click(renderer.getByText(/Меню 2/));
    });

    await waitFor(() => {
      expect(onSelect).not.toHaveBeenCalledTimes(2);
    });

    await waitFor(() => {
      expect(renderer.getByText(/Меню 4/)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(renderer.getByText(/Меню 4/));
    });

    await waitFor(() => {
      expect(onSelect).toHaveBeenLastCalledWith(['4', '2']);
    });
  });
});
