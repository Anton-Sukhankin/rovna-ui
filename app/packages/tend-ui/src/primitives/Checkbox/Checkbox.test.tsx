import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('provides a Russian accessible name when rendered without a label', () => {
    const renderer = render(<Checkbox />);

    expect(renderer.getByRole('checkbox')).toHaveAccessibleName('Флажок');
  });

  it('renders correctly', () => {
    const snap = snapshotWithTheme(<Checkbox />);
    expect(snap).toMatchSnapshot();
  });

  it('indeterminate renders correctly', () => {
    const snap = snapshotWithTheme(<Checkbox indeterminate />);
    expect(snap).toMatchSnapshot();
  });

  it('synchronizes the native indeterminate state', async () => {
    const renderer = render(
      <Checkbox
        aria-label='Частично выбранный недоступный флажок'
        disabled
        indeterminate
      />,
    );
    const checkbox = renderer.getByRole('checkbox') as HTMLInputElement;

    await waitFor(() => expect(checkbox.indeterminate).toBe(true));
    expect(checkbox).toHaveAccessibleName('Частично выбранный недоступный флажок');
  });

  it('vertical renders correctly', () => {
    const snap = snapshotWithTheme(
      <Checkbox.Group layout='vertical'>
        <Checkbox value='A'>Каменные материалы</Checkbox>
        <Checkbox value='B'>Растворы</Checkbox>
        <Checkbox value='C'>Металлы</Checkbox>
      </Checkbox.Group>,
    );
    expect(snap).toMatchSnapshot();
  });

  it('does not forward unsupported aria-required to the group container', () => {
    const renderer = render(<Checkbox.Group aria-required />);
    const group = renderer.getByRole('group');

    expect(group).not.toHaveAttribute('aria-required');
  });
});
