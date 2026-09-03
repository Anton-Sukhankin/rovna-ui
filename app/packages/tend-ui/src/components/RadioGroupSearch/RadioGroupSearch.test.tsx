import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-test-renderer';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { RadioGroupSearch } from './RadioGroupSearch';

describe('RadioGroupSearch', () => {
  it('provides a Russian accessible name for the search field', () => {
    const renderer = render(<RadioGroupSearch options={[]} />);

    expect(renderer.getByRole('textbox')).toHaveAccessibleName('Поиск по вариантам');
  });

  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <RadioGroupSearch
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
          { value: '3', label: 'Option 3' },
        ]}
      />,
    );

    expect(snap).toMatchSnapshot();
  });

  it('filters options correctly', async () => {
    const renderer = render(
      <RadioGroupSearch
        filterOptionProp='label'
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
          { value: '3', label: 'Option 3' },
        ]}
      />,
    );

    expect(renderer.getByText(/Option 1/)).toBeInTheDocument();
    expect(renderer.getByText(/Option 2/)).toBeInTheDocument();
    expect(renderer.getByText(/Option 3/)).toBeInTheDocument();

    const input = renderer.getByTestId('rovna-ui-input');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Option 1' } });
    });

    expect(renderer.queryByText(/Option 2/)).not.toBeInTheDocument();
    expect(renderer.queryByText(/Option 3/)).not.toBeInTheDocument();
  });
});
