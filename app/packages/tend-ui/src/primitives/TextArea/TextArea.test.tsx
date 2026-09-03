import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { TextArea } from '.';

describe('TextArea', () => {
  it('title appears correctly', async () => {
    const renderer = render(<TextArea />);
    const input = renderer.getByTestId('rovna-ui-textarea');
    fireEvent.change(input, { target: { value: 'Hello World' } });
    expect(input).toHaveAttribute('title', 'Hello World');
  });
});
