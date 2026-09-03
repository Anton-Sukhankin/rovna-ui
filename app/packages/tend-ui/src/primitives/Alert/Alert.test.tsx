import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Alert } from './Alert';
import { types } from './types';

describe('Alert', () => {
  it('announces an error alert', () => {
    const renderer = render(<Alert type='error' message='Не удалось сохранить' />);

    expect(renderer.getByRole('alert')).toHaveTextContent('Не удалось сохранить');
  });

  describe.each(types)('%s type', type => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <Alert type={type} message='Title' description='Description' />,
      );
      expect(snap).toMatchSnapshot();
    });

    describe('when "border" is "true"', () => {
      it('renders correctly', () => {
        const snap = snapshotWithTheme(
          <Alert type={type} border message='Title' description='Description' />,
        );
        expect(snap).toMatchSnapshot();
      });
    });

    it('closable renders correctly', () => {
      const snap = snapshotWithTheme(
        <Alert type={type} closable message='Title' description='Description' />,
      );
      expect(snap).toMatchSnapshot();
    });

    it('closes correctly', async () => {
      const renderer = render(<Alert message='Hello World' type={type} closable />);
      expect(renderer.getByText(/Hello World/)).toBeInTheDocument();
      fireEvent.click(
        renderer.getByRole('button', { name: 'Закрыть уведомление' }),
      );

      expect(renderer.queryByText(/Hello World/)).not.toBeInTheDocument();
    });

    describe.each([
      ['margin', 16],
      ['margin', '16px'],
      ['mt', 16],
      ['mt', '16px'],
      ['mr', 16],
      ['mr', '16px'],
      ['mb', 16],
      ['mb', '16px'],
      ['ml', 16],
      ['ml', '16px'],
    ] as const)('and has %s property ', (property, value) => {
      it('renders correctly', () => {
        const props = {
          [property]: value,
        };

        const snap = snapshotWithTheme(
          <Alert type={type} message='Title' description='Description' {...props} />,
        );
        expect(snap).toMatchSnapshot();
      });
    });
  });
});
