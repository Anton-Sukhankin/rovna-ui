import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { RovnaUI } from '@rovna-ui/components/theme';

import { snapshotWithTheme } from '../../../tend-ui/src/tools/snapshotWithTheme';
import { Tag } from './Tag';
import { presets } from './types';

describe('Tag', () => {
  describe.each(['medium', 'large'] as const)('%s size', size => {
    describe.each(presets)('%s preset', preset => {
      it('renders correctly', () => {
        const snap = snapshotWithTheme(<Tag size={size} preset={preset} />);
        expect(snap).toMatchSnapshot();
      });

      describe('with "borderRadius" as number', () => {
        it('renders correctly', () => {
          const snap = snapshotWithTheme(
            <Tag size={size} preset={preset} borderRadius={4} />,
          );
          expect(snap).toMatchSnapshot();
        });
      });
      describe('with "borderRadius" as string', () => {
        it('renders correctly', () => {
          const snap = snapshotWithTheme(
            <Tag size={size} preset={preset} borderRadius='4px' />,
          );
          expect(snap).toMatchSnapshot();
        });
      });
    });

    describe('"ru" locale', () => {
      it('close icon tooltip appears correctly', async () => {
        const renderer = render(<Tag size={size} closable />);
        act(() => {
          fireEvent.mouseOver(renderer.getByTestId('rovna-ui-close-icon'));
        });

        await waitFor(
          async () => {
            const result = await renderer.findByText('Закрыть');
            expect(result).toBeInTheDocument();
          },
          { timeout: 2000 },
        );
      });
    });

    describe('"en" locale', () => {
      it('close icon tooltip appears correctly', async () => {
        const renderer = render(
          <RovnaUI lang='en'>
            <Tag closable />
          </RovnaUI>,
        );
        act(() => {
          fireEvent.mouseOver(renderer.getByTestId('rovna-ui-close-icon'));
        });

        await waitFor(
          async () => {
            const result = await renderer.findByText('Close');
            expect(result).toBeInTheDocument();
          },
          { timeout: 2000 },
        );
      });
    });

    it('custom close icon tooltip appears correctly', async () => {
      const renderer = render(
        <Tag size={size} closable closeIconTooltip={{ title: 'Close tag' }} />,
      );
      act(() => {
        fireEvent.mouseOver(renderer.getByTestId('rovna-ui-close-icon'));
      });

      await waitFor(
        async () => {
          const result = await renderer.findByText('Close tag');
          expect(result).toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    it('closes correctly', async () => {
      const renderer = render(<Tag size={size} closable />);
      expect(renderer.getByTestId('rovna-ui-tag')).toBeInTheDocument();
      act(() => {
        fireEvent.click(renderer.getByTestId('rovna-ui-close-icon'));
      });
      expect(renderer.queryByTestId('rovna-ui-tag')).not.toBeInTheDocument();
    });

    it('"onClose" is called correctly', async () => {
      const onClickMock = jest.fn();
      const renderer = render(<Tag size={size} closable onClick={onClickMock} />);
      expect(onClickMock).not.toHaveBeenCalled();
      act(() => {
        fireEvent.click(renderer.getByTestId('rovna-ui-close-icon'));
      });
      expect(onClickMock).toHaveBeenCalled();
    });
  });
});
