import React from 'react';
import { render, screen } from '@testing-library/react';

import { RovnaUI } from '@rovna-internal/components/theme';
import { ChevronLeft } from '@rovna-internal/components/icons';

import { Drawer } from './Drawer';
import { sizes } from './types';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

describe('Drawer', () => {
  it('forwards its accessible name to the dialog', async () => {
    render(<Drawer aria-label='Вкладки' open />, { wrapper: RovnaUI });

    expect(await screen.findByRole('dialog', { name: 'Вкладки' })).toBeInTheDocument();
  });

  describe.each(sizes)('when size is "%s"', size => {
    it('renders correctly', () => {
      const renderer = render(
        <Drawer open title='Заголовок' size={size}>
          <div>Child</div>
        </Drawer>,
        { wrapper: RovnaUI },
      );

      expect(renderer.asFragment()).toMatchSnapshot();
    });

    it('and has "before" renders correctly', () => {
      const renderer = render(
        <Drawer open title='Заголовок' size={size} before={<ChevronLeft />}>
          <div>Child</div>
        </Drawer>,
        { wrapper: RovnaUI },
      );

      expect(renderer.asFragment()).toMatchSnapshot();
    });
  });

  it('when "fullscreen" is "true" renders correctly', () => {
    const renderer = render(
      <Drawer open title='Заголовок' fullscreen>
        <div>Child</div>
      </Drawer>,
      { wrapper: RovnaUI },
    );

    expect(renderer.asFragment()).toMatchSnapshot();
  });

  describe.each(['top', 'right', 'left', 'bottom'] as const)(
    'when "placement" is "%s"',
    placement => {
      it('renders correctly', () => {
        const renderer = render(
          <Drawer open title='Заголовок' placement={placement}>
            <div>Child</div>
          </Drawer>,
          { wrapper: RovnaUI },
        );

        expect(renderer.asFragment()).toMatchSnapshot();
      });

      it('and "fullscreen" is "true" renders correctly', () => {
        const renderer = render(
          <Drawer open title='Заголовок' fullscreen placement={placement}>
            <div>Child</div>
          </Drawer>,
          { wrapper: RovnaUI },
        );

        expect(renderer.asFragment()).toMatchSnapshot();
      });
    },
  );
});
