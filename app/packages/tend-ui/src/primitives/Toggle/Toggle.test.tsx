import React from 'react';
import { render } from '@testing-library/react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('provides a Russian accessible name and uses visible text when supplied', () => {
    const renderer = render(<Toggle />);

    expect(renderer.getByRole('switch')).toHaveAccessibleName('Переключатель');

    renderer.rerender(<Toggle>Темная тема</Toggle>);
    expect(renderer.getByRole('switch')).toHaveAccessibleName('Темная тема');
  });

  describe.each(['small', 'default'] as const)('%s size', size => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(<Toggle size={size} />);
      expect(snap).toMatchSnapshot();
    });

    it('horizontal group renders correctly', () => {
      const snap = snapshotWithTheme(
        <Toggle.Group>
          <Toggle size={size}>Toggle 1</Toggle>
          <Toggle size={size}>Toggle 2</Toggle>
          <Toggle size={size}>Toggle 3</Toggle>
        </Toggle.Group>,
      );
      expect(snap).toMatchSnapshot();
    });

    it('vertical group renders correctly', () => {
      const snap = snapshotWithTheme(
        <Toggle.Group layout='vertical'>
          <Toggle size={size}>Toggle 1</Toggle>
          <Toggle size={size}>Toggle 2</Toggle>
          <Toggle size={size}>Toggle 3</Toggle>
        </Toggle.Group>,
      );
      expect(snap).toMatchSnapshot();
    });

    it('disabled renders correctly', () => {
      const snap = snapshotWithTheme(<Toggle size={size} disabled />);
      expect(snap).toMatchSnapshot();
    });

    it('checked renders correctly', () => {
      const snap = snapshotWithTheme(<Toggle size={size} checked />);
      expect(snap).toMatchSnapshot();
    });

    it('with label renders correctly', () => {
      const renderer = render(<Toggle size={size}>Dark theme</Toggle>);
      const snap = snapshotWithTheme(<Toggle size={size}>Dark theme</Toggle>);
      expect(snap).toMatchSnapshot();
      expect(renderer.getByText('Dark theme')).toBeInTheDocument();
    });
  });
});
