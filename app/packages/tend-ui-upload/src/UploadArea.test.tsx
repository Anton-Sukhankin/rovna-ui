import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { snapshotWithTheme } from '../../tend-ui/src/tools/snapshotWithTheme';
import { UploadArea } from './UploadArea';

describe('UploadArea', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(<UploadArea />);
    expect(snap).toMatchSnapshot();
  });

  it.each(['Enter', ' '])('opens the file input with %s', key => {
    const renderer = render(<UploadArea />);
    const uploadButton = renderer.getByRole('button', {
      name: /Перетащите файл/i,
    });
    const input = renderer.container.querySelector<HTMLInputElement>(
      'input[type="file"]',
    );

    expect(input).not.toBeNull();
    const click = jest.spyOn(input!, 'click');
    fireEvent.keyDown(uploadButton, { key });
    expect(click).toHaveBeenCalledTimes(1);
  });

  it('removes a disabled upload area from the tab order', () => {
    const renderer = render(<UploadArea disabled />);
    const uploadButton = renderer.getByRole('button', {
      name: /Перетащите файл/i,
    });

    expect(uploadButton).toHaveAttribute('aria-disabled', 'true');
    expect(uploadButton).toHaveAttribute('tabindex', '-1');
  });
});
