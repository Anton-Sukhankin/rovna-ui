import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { Button } from '@rovna-internal/components/primitives/Button';

import { Modal } from './Modal';
import { ModalProps } from './types';

const Template = (props: ModalProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open
      </Button>
      <Modal
        {...props}
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

describe('Modal', () => {
  it('opens correctly', () => {
    const renderer = render(<Template />);
    expect(renderer.queryByTestId('rovna-ui-modal')).not.toBeInTheDocument();
    fireEvent.click(renderer.getByTestId('rovna-ui-button'));
    expect(renderer.getByTestId('rovna-ui-modal')).toBeInTheDocument();
  });

  it('destroys on close correctly', () => {
    const renderer = render(<Template destroyOnClose />);
    expect(renderer.queryByTestId('rovna-ui-modal')).not.toBeInTheDocument();
    fireEvent.click(renderer.getByTestId('rovna-ui-button'));
    expect(renderer.getByTestId('rovna-ui-modal')).toBeInTheDocument();
    fireEvent.click(renderer.getByTestId('rovna-ui-modal-cancel-button'));
    expect(renderer.queryByTestId('rovna-ui-modal')).not.toBeInTheDocument();
  });

  it('executes onOk callback correctly', () => {
    const onOkMock = jest.fn();
    const renderer = render(<Modal open onOk={onOkMock} />);
    fireEvent.click(renderer.getByTestId('rovna-ui-modal-ok-button'));
    expect(onOkMock).toHaveBeenCalledTimes(1);
  });

  it('executes onCancel callback correctly', () => {
    const onCancelMock = jest.fn();
    const renderer = render(<Modal open onCancel={onCancelMock} />);
    fireEvent.click(renderer.getByTestId('rovna-ui-modal-cancel-button'));
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  it('renders custom array footer correctly', () => {
    const renderer = render(
      <Modal
        open
        footer={[
          <span key='1'>Custom footer child 1</span>,
          <span key='2'>Custom footer child 2</span>,
        ]}
      />,
    );
    expect(renderer.getByText('Custom footer child 1')).toBeInTheDocument();
    expect(renderer.getByText('Custom footer child 2')).toBeInTheDocument();
  });

  it('renders custom node footer correctly', () => {
    const renderer = render(
      <Modal
        open
        footer={
          <>
            <span key='1'>Custom footer child 1</span>
            <span key='2'>Custom footer child 2</span>
          </>
        }
      />,
    );
    expect(renderer.getByText('Custom footer child 1')).toBeInTheDocument();
    expect(renderer.getByText('Custom footer child 2')).toBeInTheDocument();
  });

  it('renders custom array title correctly', () => {
    const renderer = render(
      <Modal
        open
        title={[
          <span key='1'>Custom title child 1</span>,
          <span key='2'>Custom title child 2</span>,
        ]}
      />,
    );
    expect(renderer.getByText('Custom title child 1')).toBeInTheDocument();
    expect(renderer.getByText('Custom title child 2')).toBeInTheDocument();
  });

  it('close icon tooltip appears correctly', async () => {
    const onCancelMock = jest.fn();
    const renderer = render(<Modal open onCancel={onCancelMock} />);
    fireEvent.mouseOver(renderer.getByTestId('rovna-ui-close-icon'));

    await waitFor(
      async () => {
        const content = await renderer.findByText(/Закрыть/);
        expect(content).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });

  it('custom close icon tooltip appears correctly', async () => {
    const onCancelMock = jest.fn();
    const renderer = render(
      <Modal open onCancel={onCancelMock} closeIconTooltip={{ title: 'Close' }} />,
    );
    fireEvent.mouseOver(renderer.getByTestId('rovna-ui-close-icon'));

    await waitFor(
      async () => {
        const content = await renderer.findByText(/Close/);
        expect(content).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });
});
