import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Collapse } from './Collapse';

describe('Collapse', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(<Collapse label='Title'>Content</Collapse>);

    expect(snap).toMatchSnapshot();
  });

  it('opens correctly', () => {
    const renderer = render(<Collapse label='Title'>Content</Collapse>);

    const title = renderer.getByText(/Title/);
    expect(renderer.container.querySelector('[data-state="false"]')).toBeInTheDocument();
    fireEvent.click(title);
    expect(renderer.container.querySelector('[data-state="true"]')).toBeInTheDocument();
  });

  it('executes "onOpenChange" correctly', () => {
    const onOpenChangeMock = jest.fn();
    const renderer = render(
      <Collapse onOpenChange={onOpenChangeMock} label='Title'>
        Content
      </Collapse>,
    );

    const title = renderer.getByText(/Title/);
    fireEvent.click(title);

    expect(onOpenChangeMock).toHaveBeenCalledWith(true);
    fireEvent.click(title);
    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
  });
});
