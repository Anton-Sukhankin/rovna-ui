import React from 'react';
import { render } from '@testing-library/react';

import { snapshotWithTheme } from '../../../tend-ui/src/tools/snapshotWithTheme';
import { Counter } from './Counter';
import { presets } from './types';

describe('Counter', () => {
  it('announces count changes politely', () => {
    const renderer = render(<Counter inner={3} />);

    expect(renderer.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    expect(renderer.getByRole('status')).toHaveTextContent('3');
  });

  describe.each(presets)('%s preset', preset => {
    it('with "rootClassName" property renders correctly', () => {
      const renderer = render(
        <Counter preset={preset} rootClassName='some-custom-root-class-name'>
          <span>Child</span>
        </Counter>,
      );
      const snap = snapshotWithTheme(
        <Counter preset={preset} rootClassName='some-custom-root-class-name'>
          <span>Child</span>
        </Counter>,
      );
      expect(snap).toMatchSnapshot();
      expect(renderer.getByText('Child')).toBeInTheDocument();
    });

    it('as counter renders correctly', () => {
      const renderer = render(
        <Counter preset={preset} inner={100}>
          <span>Child</span>
        </Counter>,
      );
      const snap = snapshotWithTheme(
        <Counter preset={preset} inner={100}>
          <span>Child</span>
        </Counter>,
      );
      expect(snap).toMatchSnapshot();
      expect(renderer.getByText('Child')).toBeInTheDocument();
    });

    it('as counter with "inner={0}" renders correctly', () => {
      const renderer = render(
        <Counter preset={preset} inner={0}>
          <span>Child</span>
        </Counter>,
      );
      const snap = snapshotWithTheme(
        <Counter preset={preset} inner={0}>
          <span>Child</span>
        </Counter>,
      );
      expect(snap).toMatchSnapshot();
      expect(renderer.queryByText('0')).not.toBeInTheDocument();

      renderer.rerender(
        <Counter preset={preset} inner={100}>
          <span>Child</span>
        </Counter>,
      );

      expect(renderer.getByText('99+')).toBeInTheDocument();
    });

    it('as counter with "inner={0}" and "showZero={true}" renders correctly', () => {
      const renderer = render(
        <Counter showZero preset={preset} inner={0}>
          <span>Child</span>
        </Counter>,
      );
      const snap = snapshotWithTheme(
        <Counter showZero preset={preset} inner={0}>
          <span>Child</span>
        </Counter>,
      );
      expect(snap).toMatchSnapshot();
      expect(renderer.getByText('0')).toBeInTheDocument();

      renderer.rerender(
        <Counter showZero preset={preset} inner={100}>
          <span>Child</span>
        </Counter>,
      );

      expect(renderer.getByText('99+')).toBeInTheDocument();
    });
  });
});
