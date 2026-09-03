import React from 'react';
import { render } from '@testing-library/react';

import { createContext } from './createContext';

describe('createContext', () => {
  it('returns correct result', () => {
    const [Context, useContext] = createContext<{ message: string }>('Messager');
    expect(Context).toBeInstanceOf(Object);
    expect(useContext).toBeInstanceOf(Function);
  });
  describe('when context value is given', () => {
    it('provides consumers with value correctly', () => {
      const [MessageProvider, useMessage] = createContext<{ message: string }>(
        'Messager',
      );

      const Consumer = () => {
        const ctx = useMessage('Consumer');

        return <div>{ctx.message}</div>;
      };

      const renderer = render(
        <MessageProvider message='Hello World'>
          <Consumer />
        </MessageProvider>,
      );

      expect(renderer.getByText(/Hello World/)).toBeInTheDocument();
    });
  });
  describe('when context value is NOT given', () => {
    it('does not provide consumer with value correctly', () => {
      const [MessageProvider, useMessage] = createContext<{ message?: string }>(
        'Messager',
      );

      const Consumer = () => {
        const ctx = useMessage('Consumer');

        return <div>{ctx.message}</div>;
      };

      const renderer = render(
        <MessageProvider>
          <Consumer />
        </MessageProvider>,
      );

      expect(renderer.queryByText(/Hello World/)).not.toBeInTheDocument();
    });
  });
});
