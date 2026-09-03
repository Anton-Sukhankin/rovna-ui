import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Popover } from './Popover';

describe('Popover', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <Popover title='Title' content='Content'>
        Child
      </Popover>,
    );

    expect(snap).toMatchSnapshot();
  });

  it('appears correctly', async () => {
    const renderer = render(
      <Popover title='Title' content='Content'>
        Child
      </Popover>,
    );

    act(() => {
      fireEvent.mouseOver(renderer.getByText('Child'));
    });

    const title = await renderer.findByText('Title');
    const content = await renderer.findByText('Content');

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('with footer appears correctly', async () => {
    const renderer = render(
      <Popover title='Title' content='Content' footer={[<div key='footer'>Footer</div>]}>
        Child
      </Popover>,
    );

    act(() => {
      fireEvent.mouseOver(renderer.getByText('Child'));
    });

    const title = await renderer.findByText('Title');
    const content = await renderer.findByText('Content');
    const footer = await renderer.findByText('Footer');

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it('closes on Escape and restores focus to its trigger', async () => {
    const renderer = render(
      <Popover title='Заголовок' content='Содержимое' trigger={['click']}>
        <button type='button'>Открыть подсказку</button>
      </Popover>,
    );
    const trigger = renderer.getByRole('button', { name: 'Открыть подсказку' });

    trigger.focus();
    fireEvent.click(trigger);
    expect(await renderer.findByText('Содержимое')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => expect(trigger).toHaveFocus());
    await waitFor(() => expect(renderer.queryByText('Содержимое')).not.toBeVisible());
  });
});
