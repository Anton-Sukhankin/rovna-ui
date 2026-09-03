import React from 'react';
import { render } from '@testing-library/react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Badge } from './Badge';
import { presets } from './types';

describe('Badge', () => {
  describe.each(presets)('%s preset', preset => {
    it('with "rootClassName" property renders correctly', () => {
      const renderer = render(
        <Badge preset={preset} rootClassName='some-custom-root-class-name'>
          <span>Child</span>
        </Badge>,
      );
      const snap = snapshotWithTheme(
        <Badge preset={preset} rootClassName='some-custom-root-class-name'>
          <span>Child</span>
        </Badge>,
      );
      expect(snap).toMatchSnapshot();
      expect(renderer.getByText('Child')).toBeInTheDocument();
    });

    it('as dot renders correctly', () => {
      const snap = snapshotWithTheme(<Badge preset={preset} />);
      expect(snap).toMatchSnapshot();
    });

    it('as dot with "before" content renders correctly', () => {
      const snap = snapshotWithTheme(<Badge preset={preset} before='Before' />);
      expect(snap).toMatchSnapshot();
    });

    it('as dot with "after" content renders correctly', () => {
      const snap = snapshotWithTheme(<Badge preset={preset} after='After' />);
      expect(snap).toMatchSnapshot();
    });

    it('as counter renders correctly', () => {
      const renderer = render(
        <Badge preset={preset} inner={100}>
          <span>Child</span>
        </Badge>,
      );
      const snap = snapshotWithTheme(
        <Badge preset={preset} inner={100}>
          <span>Child</span>
        </Badge>,
      );
      expect(snap).toMatchSnapshot();
      expect(renderer.getByText('Child')).toBeInTheDocument();
    });

    it('as counter with "inner={0}"  renders correctly', () => {
      const renderer = render(
        <Badge preset={preset} inner={0}>
          <span>Child</span>
        </Badge>,
      );
      const snap = snapshotWithTheme(
        <Badge preset={preset} inner={0}>
          <span>Child</span>
        </Badge>,
      );
      expect(snap).toMatchSnapshot();
      expect(renderer.queryByText('0')).not.toBeInTheDocument();

      renderer.rerender(
        <Badge preset={preset} inner={100}>
          <span>Child</span>
        </Badge>,
      );

      expect(renderer.getByText('99+')).toBeInTheDocument();
    });

    it('as counter with "inner={0}" and "showZero={true}" renders correctly', () => {
      const renderer = render(
        <Badge showZero preset={preset} inner={0}>
          <span>Child</span>
        </Badge>,
      );
      const snap = snapshotWithTheme(
        <Badge showZero preset={preset} inner={0}>
          <span>Child</span>
        </Badge>,
      );
      expect(snap).toMatchSnapshot();
      expect(renderer.getByText('0')).toBeInTheDocument();

      renderer.rerender(
        <Badge showZero preset={preset} inner={100}>
          <span>Child</span>
        </Badge>,
      );

      expect(renderer.getByText('99+')).toBeInTheDocument();
    });

    it('as bubble renders correctly', () => {
      const renderer = render(<Badge preset={preset} inner={<span>Child</span>} />);
      const snap = snapshotWithTheme(
        <Badge preset={preset} inner={<span>Child</span>} />,
      );
      expect(snap).toMatchSnapshot();
      expect(renderer.getByText('Child')).toBeInTheDocument();
    });

    it('with custom padding renders correctly', () => {
      const snap = snapshotWithTheme(
        <Badge preset={preset} inner={100} padding='0 8px' />,
      );
      expect(snap).toMatchSnapshot();
    });

    it('as dot renders correctly', () => {
      const snap = snapshotWithTheme(<Badge>Lorem ipsum dolor sit amet.</Badge>);
      expect(snap).toMatchSnapshot();
    });
  });
});
