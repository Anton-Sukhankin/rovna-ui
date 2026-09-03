import { act, renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';

import { useClickOutside } from './useClickOutside';

describe('useClickOutside(', () => {
  it('should call the onClick when a clicking outside the element (single ref)', () => {
    const ref = { current: document.createElement('div') };
    const onClick = jest.fn();

    renderHook(() => {
      useClickOutside(ref, onClick);
    });

    expect(onClick).toHaveBeenCalledTimes(0);

    // Simulate click outside the container
    act(() => {
      fireEvent.mouseDown(document);
    });

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should NOT call the onClick when a clicking inside the element', () => {
    const ref = { current: document.createElement('div') };
    const onClick = jest.fn();

    renderHook(() => {
      useClickOutside(ref, onClick);
    });

    // Simulate click inside the container
    act(() => {
      fireEvent.mouseDown(ref.current);
    });

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('should NOT call the onClick when clicking a non-connected element', () => {
    const ref = { current: document.createElement('div') };
    const onClick = jest.fn();

    renderHook(() => {
      useClickOutside(ref, onClick);
    });

    // Simulate click on a non-connected element
    act(() => {
      const element = document.createElement('div');
      document.body.appendChild(element);
      document.body.removeChild(element);
      fireEvent.mouseDown(element);
    });

    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
