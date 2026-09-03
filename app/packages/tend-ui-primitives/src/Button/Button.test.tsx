import React from 'react';
import { AccountBox, Home } from '@rovna-ui/icons';

import { snapshotWithTheme } from '../../../tend-ui/src/tools/snapshotWithTheme';
import { Button } from './Button';
import { presets, sizes, variants } from './types';
import { ButtonGroup } from './components';

describe('Button', () => {
  describe.each(sizes)('with %s size', size => {
    describe.each(variants)('%s variant', variant => {
      describe.each(presets)('%s preset', preset => {
        it('renders correctly', () => {
          const snap = snapshotWithTheme(
            <Button preset={preset} variant={variant} size={size}>
              Button
            </Button>,
          );
          expect(snap).toMatchSnapshot();
        });

        it('with no padding renders correctly', () => {
          const snap = snapshotWithTheme(
            <Button padding={false} preset={preset} variant={variant} size={size}>
              Button
            </Button>,
          );
          expect(snap).toMatchSnapshot();
        });

        it('with no padding and before renders correctly', () => {
          const snap = snapshotWithTheme(
            <Button
              padding={false}
              preset={preset}
              variant={variant}
              size={size}
              before={<AccountBox />}
            >
              Button
            </Button>,
          );
          expect(snap).toMatchSnapshot();
        });

        it('with left icon renders correctly', () => {
          const snap = snapshotWithTheme(
            <Button preset={preset} variant={variant} size={size} before={<AccountBox />}>
              Button
            </Button>,
          );
          expect(snap).toMatchSnapshot();
        });

        it('with right icon renders correctly', () => {
          const snap = snapshotWithTheme(
            <Button preset={preset} variant={variant} size={size} after={<Home />}>
              Button
            </Button>,
          );
          expect(snap).toMatchSnapshot();
        });

        it('with both icons renders correctly', () => {
          const snap = snapshotWithTheme(
            <Button
              preset={preset}
              variant={variant}
              size={size}
              before={<Home />}
              after={<AccountBox />}
            >
              Button
            </Button>,
          );
          expect(snap).toMatchSnapshot();
        });

        it('danger renders correctly', () => {
          const snap = snapshotWithTheme(
            <Button preset={preset} danger variant={variant} size={size}>
              Button
            </Button>,
          );
          expect(snap).toMatchSnapshot();
        });

        it('loading renders correctly', () => {
          const snap = snapshotWithTheme(
            <Button preset={preset} loading variant={variant} size={size}>
              Button
            </Button>,
          );
          expect(snap).toMatchSnapshot();
        });

        it('disabled renders correctly', () => {
          const snap = snapshotWithTheme(
            <Button preset={preset} disabled variant={variant} size={size}>
              Button
            </Button>,
          );
          expect(snap).toMatchSnapshot();
        });

        it('as "a" renders correctly', () => {
          const snap = snapshotWithTheme(
            <Button
              preset={preset}
              href='https://google.com'
              as='a'
              variant={variant}
              size={size}
            >
              Button
            </Button>,
          );
          expect(snap).toMatchSnapshot();
        });

        it('under "ButtonGroup" renders correctly', () => {
          const snap = snapshotWithTheme(
            <ButtonGroup>
              <Button preset={preset} variant={variant} size={size}>
                One
              </Button>
              <Button preset={preset} variant={variant} size={size}>
                Two
              </Button>
              <Button preset={preset} variant={variant} size={size}>
                Three
              </Button>
            </ButtonGroup>,
          );
          expect(snap).toMatchSnapshot();
        });
      });
    });
  });
});
