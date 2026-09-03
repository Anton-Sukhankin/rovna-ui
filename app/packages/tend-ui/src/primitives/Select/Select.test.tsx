import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Select } from './Select';

const options = [
  { label: 'Option 1', value: 'Option 1', key: '1' },
  { label: 'Option 2', value: 'Option 2', key: '2' },
  { label: 'Option 3', value: 'Option 3', key: '3' },
];

describe('Select', () => {
  it('provides a Russian accessible name and removes invalid wrapper references', async () => {
    const renderer = render(<Select options={options} />);

    expect(renderer.getByRole('combobox')).toHaveAccessibleName('Выбор значения');
    expect(renderer.getByTestId('rovna-ui-select')).not.toHaveAttribute('aria-label');
    await waitFor(() => {
      expect(renderer.getByRole('combobox')).not.toHaveAttribute('aria-controls');
      expect(renderer.getByRole('combobox')).not.toHaveAttribute('aria-owns');
    });

    renderer.rerender(<Select aria-label='Выбор сотрудника' options={options} />);
    expect(renderer.getByRole('combobox')).toHaveAccessibleName('Выбор сотрудника');
    expect(renderer.getByTestId('rovna-ui-select')).not.toHaveAttribute('aria-label');
  });

  it('keeps an empty loading list closed without an invalid active descendant', () => {
    const renderer = render(
      <Select aria-label='Выбор варианта' loading open options={[]} />,
    );
    const combobox = renderer.getByRole('combobox');

    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(combobox).not.toHaveAttribute('aria-activedescendant');
  });

  it('opens after loading when the user requested the dropdown while it was empty', () => {
    const renderer = render(
      <Select aria-label='Выбор варианта' loading options={[]} />,
    );
    const combobox = renderer.getByRole('combobox');

    fireEvent.mouseDown(combobox);
    expect(combobox).toHaveAttribute('aria-expanded', 'false');

    renderer.rerender(
      <Select aria-label='Выбор варианта' loading={false} options={options} />,
    );
    expect(combobox).toHaveAttribute('aria-expanded', 'true');
  });

  it('restores the listbox reference while open', async () => {
    const renderer = render(<Select virtual={false} options={options} />);
    const combobox = renderer.getByRole('combobox');

    fireEvent.mouseDown(combobox);
    await waitFor(() => {
      const controls = combobox.getAttribute('aria-controls');
      expect(combobox).toHaveAttribute('aria-expanded', 'true');
      expect(controls).toBeTruthy();
      expect(document.getElementById(controls!)).not.toBeNull();
    });

    combobox.removeAttribute('aria-controls');
    await waitFor(() => {
      const controls = combobox.getAttribute('aria-controls');
      expect(controls).toBeTruthy();
      expect(document.getElementById(controls!)).not.toBeNull();
    });
  });

  describe.each(['large', 'small', 'medium'] as const)('when size is "%s"', size => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <Select size={size} virtual={false} options={options} />,
      );
      expect(snap).toMatchSnapshot();
    });

    describe('and some option has been clicked', () => {
      it('calls "onSelect" callback correctly', async () => {
        const onSelectMock = jest.fn();
        const renderer = render(
          <Select size={size} virtual={false} options={options} onSelect={onSelectMock} />,
        );

        act(() => {
          fireEvent.mouseDown(renderer.getByRole('combobox'));
        });

        await waitFor(() => {
          expect(renderer.queryByText(/Option 1/)).toBeInTheDocument();
          expect(renderer.queryByText(/Option 2/)).toBeInTheDocument();
          expect(renderer.queryByText(/Option 3/)).toBeInTheDocument();
        });

        act(() => {
          fireEvent.click(renderer.getByRole('option', { name: 'Option 1' }));
        });

        await waitFor(() => {
          expect(onSelectMock).toHaveBeenCalledWith(
            'Option 1',
            expect.objectContaining({ label: 'Option 1', value: 'Option 1' }),
          );
        });
      });
    });

    describe('and "width" property is set to custom value', () => {
      it('renders correctly', () => {
        const snap = snapshotWithTheme(
          <Select width='350px' virtual={false} options={options} />,
        );
        expect(snap).toMatchSnapshot();
      });
    });

    describe('and "fullWidth" property is "true"', () => {
      it('renders correctly', () => {
        const snap = snapshotWithTheme(
          <Select fullWidth virtual={false} options={options} />,
        );
        expect(snap).toMatchSnapshot();
      });
    });

    describe('and arrow icon has been clicked', () => {
      it('opens options dropdown correctly', async () => {
        const renderer = render(<Select fullWidth virtual={false} options={options} />);

        act(() => {
          fireEvent.click(renderer.getByTestId('rovna-ui-chevron-down-icon'));
        });

        await waitFor(async () => {
          expect(renderer.queryByText(/Option 1/)).toBeInTheDocument();
          expect(renderer.queryByText(/Option 2/)).toBeInTheDocument();
          expect(renderer.queryByText(/Option 3/)).toBeInTheDocument();
        });
      });
    });
  });
});
