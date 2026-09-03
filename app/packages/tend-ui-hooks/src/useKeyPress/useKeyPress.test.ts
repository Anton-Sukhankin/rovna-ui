import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useKeyPress } from './useKeyPress';

describe('useKeyPress', () => {
  it('should call the onPress when a pressing correct key', () => {
    const onClick = jest.fn();

    renderHook(() => {
      useKeyPress('Escape', onClick);
    });

    expect(onClick).toHaveBeenCalledTimes(0);

    act(() => {
      fireEvent.keyDown(document, {
        key: 'Escape',
      });
    });

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not call the onPress when a pressing a wrong key', () => {
    const onClick = jest.fn();

    renderHook(() => {
      useKeyPress('Enter', onClick);
    });

    expect(onClick).toHaveBeenCalledTimes(0);

    act(() => {
      fireEvent.keyDown(document, {
        key: 'Escape',
      });
    });

    expect(onClick).not.toHaveBeenCalledTimes(1);
  });
});
