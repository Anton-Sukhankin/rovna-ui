import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { useHover } from './useHover';

describe('useHover', () => {
  it('returns correct result', async () => {
    const Component = () => {
      const [isHovered, listeners] = useHover();

      return (
        <div data-testid='parent' {...listeners}>
          {isHovered && <div data-testid='child'>Child</div>}
        </div>
      );
    };

    const renderer = render(<Component />);

    expect(renderer.queryByTestId('child')).not.toBeInTheDocument();

    act(() => {
      fireEvent.mouseEnter(renderer.getByTestId('parent'));
    });

    waitFor(() => {
      expect(renderer.getByTestId('child')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.mouseLeave(renderer.getByTestId('parent'));
    });

    waitFor(() => {
      expect(renderer.queryByTestId('child')).not.toBeInTheDocument();
    });
  });
});
