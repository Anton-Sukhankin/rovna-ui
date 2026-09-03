import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Avatar } from './Avatar';
import { sizes } from './types';

describe('Avatar', () => {
  it('provides Russian alternative text and preserves an override', async () => {
    const image = document.createElement('img');
    Object.defineProperty(image, 'src', {
      set: () => {
        setTimeout(() => image.onload?.(new Event('load')), 0);
      },
    });
    const imageMock = jest.spyOn(window, 'Image').mockImplementation(() => image);
    const renderer = render(<Avatar src='avatar.png' />);

    await waitFor(() =>
      expect(renderer.getByRole('img')).toHaveAccessibleName('Аватар пользователя'),
    );

    renderer.rerender(<Avatar alt='Анна Иванова' src='avatar.png' />);
    await waitFor(() =>
      expect(renderer.getByRole('img')).toHaveAccessibleName('Анна Иванова'),
    );
    imageMock.mockRestore();
  });

  describe.each(sizes)('"size" is %s', size => {
    describe('and "src" is empty', () => {
      it('renders correctly', () => {
        const snap = snapshotWithTheme(<Avatar size={size} />);
        expect(snap).toMatchSnapshot();

        const renderer = render(<Avatar size={size} />);
        expect(renderer.getByTestId('rovna-ui-avatar-fallback')).toBeInTheDocument();
        expect(renderer.queryByTestId('rovna-ui-avatar-image')).not.toBeInTheDocument();
        expect(renderer.queryByTestId('rovna-ui-badge')).not.toBeInTheDocument();
      });
    });

    it.each(['online', 'offline', 'away'] as const)(
      'with %s status renders correctly',
      status => {
        const snap = snapshotWithTheme(<Avatar size={size} status={status} />);
        expect(snap).toMatchSnapshot();

        const renderer = render(<Avatar size={size} status={status} />);
        expect(renderer.getByTestId('rovna-ui-avatar-fallback')).toBeInTheDocument();
        expect(renderer.getByTestId('rovna-ui-badge')).toBeInTheDocument();
        expect(renderer.queryByTestId('rovna-ui-avatar-image')).not.toBeInTheDocument();
      },
    );

    it('and "src" is array', () => {
      const snap = snapshotWithTheme(<Avatar size={size} src={[]} />);
      expect(snap).toMatchSnapshot();
      const renderer = render(<Avatar size={size} />);
      expect(renderer.getByTestId('rovna-ui-avatar-fallback')).toBeInTheDocument();
      expect(renderer.queryByTestId('rovna-ui-avatar-image')).not.toBeInTheDocument();
    });

    it('when component has children', () => {
      const snap = snapshotWithTheme(<Avatar size={size}>Hello World</Avatar>);
      expect(snap).toMatchSnapshot();
      const renderer = render(<Avatar size={size}>Hello World</Avatar>);
      expect(renderer.getByTestId('rovna-ui-avatar-fallback')).toBeInTheDocument();
      expect(renderer.getByText(/Hello World/)).toBeInTheDocument();
      expect(renderer.queryByTestId('rovna-ui-avatar-image')).not.toBeInTheDocument();
    });

    describe('with "List"', () => {
      describe('with no "max" property renders correctly', () => {
        it('list renders correctly', () => {
          const snap = snapshotWithTheme(
            <Avatar.List>
              <Avatar size={size}>Avatar 1</Avatar>
              <Avatar size={size}>Avatar 2</Avatar>
              <Avatar size={size}>Avatar 3</Avatar>
              <Avatar size={size}>Avatar 4</Avatar>
              <Avatar size={size}>Avatar 5</Avatar>
              <Avatar size={size}>Avatar 6</Avatar>
              <Avatar size={size}>Avatar 7</Avatar>
            </Avatar.List>,
          );
          expect(snap).toMatchSnapshot();
        });
      });

      describe('with "max" property renders correctly', () => {
        it('list renders correctly', () => {
          const snap = snapshotWithTheme(
            <Avatar.List max={3}>
              <Avatar size={size}>Avatar 1</Avatar>
              <Avatar size={size}>Avatar 2</Avatar>
              <Avatar size={size}>Avatar 3</Avatar>
              <Avatar size={size}>Avatar 4</Avatar>
              <Avatar size={size}>Avatar 5</Avatar>
              <Avatar size={size}>Avatar 6</Avatar>
              <Avatar size={size}>Avatar 7</Avatar>
            </Avatar.List>,
          );
          expect(snap).toMatchSnapshot();
          const renderer = render(
            <Avatar.List max={3}>
              <Avatar size={size}>Avatar 1</Avatar>
              <Avatar size={size}>Avatar 2</Avatar>
              <Avatar size={size}>Avatar 3</Avatar>
              <Avatar size={size}>Avatar 4</Avatar>
              <Avatar size={size}>Avatar 5</Avatar>
              <Avatar size={size}>Avatar 6</Avatar>
              <Avatar size={size}>Avatar 7</Avatar>
            </Avatar.List>,
          );
          expect(renderer.getByText(/\+4/)).toBeInTheDocument();
        });
      });
    });
  });
});
