import React from 'react';
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { act } from 'react-test-renderer';

import { Dialog } from './Dialog';

describe('Dialog', () => {
  describe('success', () => {
    it('renders and closes correctly', async () => {
      const renderer = render(<body />);

      act(() => {
        Dialog.success({
          title: 'Some success dialog title',
        });
      });

      expect(await renderer.findByText(/Some success dialog title/)).toBeInTheDocument();
      fireEvent.click(await renderer.findByTestId('rovna-ui-dialog-cancel-button'));

      await waitForElementToBeRemoved(() =>
        renderer.queryByText(/Some success dialog title/),
      );

      expect(renderer.queryByText(/Some success dialog title/)).not.toBeInTheDocument();
    });
  });
  describe('error', () => {
    it('renders and closes correctly', async () => {
      const renderer = render(<body />);

      Dialog.error({
        title: 'Some error dialog title',
      });

      expect(await renderer.findByText(/Some error dialog title/)).toBeInTheDocument();
      fireEvent.click(await renderer.findByTestId('rovna-ui-dialog-cancel-button'));

      await waitForElementToBeRemoved(() =>
        renderer.queryByText(/Some error dialog title/),
      );

      expect(renderer.queryByText(/Some error dialog title/)).not.toBeInTheDocument();
    });
  });
  describe('warning', () => {
    it('renders and closes correctly', async () => {
      const renderer = render(<body />);

      Dialog.warning({
        title: 'Some warning dialog title',
      });

      expect(await renderer.findByText(/Some warning dialog title/)).toBeInTheDocument();
      fireEvent.click(await renderer.findByTestId('rovna-ui-dialog-cancel-button'));

      await waitForElementToBeRemoved(() =>
        renderer.queryByText(/Some warning dialog title/),
      );

      expect(renderer.queryByText(/Some warning dialog title/)).not.toBeInTheDocument();
    });
  });
  describe('info', () => {
    it('renders and closes correctly', async () => {
      const renderer = render(<body />);

      Dialog.info({
        title: 'Some info dialog title',
      });

      expect(await renderer.findByText(/Some info dialog title/)).toBeInTheDocument();
      fireEvent.click(await renderer.findByTestId('rovna-ui-dialog-cancel-button'));

      await waitForElementToBeRemoved(() =>
        renderer.queryByText(/Some info dialog title/),
      );

      expect(renderer.queryByText(/Some info dialog title/)).not.toBeInTheDocument();
    });
  });
  describe('confirm', () => {
    it('renders and closes correctly', async () => {
      const renderer = render(<body />);

      Dialog.confirm({
        title: 'Some confirm dialog title',
      });

      expect(await renderer.findByText(/Some confirm dialog title/)).toBeInTheDocument();
      fireEvent.click(await renderer.findByTestId('rovna-ui-dialog-cancel-button'));

      await waitForElementToBeRemoved(() =>
        renderer.queryByText(/Some confirm dialog title/),
      );

      expect(renderer.queryByText(/Some confirm dialog title/)).not.toBeInTheDocument();
    });
    it('invokes "onOk" callback correctly', async () => {
      const onOkMock = jest.fn();
      const renderer = render(<body />);

      Dialog.confirm({
        title: 'Some confirm dialog title',
        onOk: onOkMock,
      });

      expect(await renderer.findByText(/Some confirm dialog title/)).toBeInTheDocument();
      fireEvent.click(await renderer.findByTestId('rovna-ui-dialog-ok-button'));
      expect(onOkMock).toHaveBeenCalledTimes(1);
    });
    it('invokes "onCancel" callback correctly', async () => {
      const onCancelMock = jest.fn();
      const renderer = render(<body />);

      Dialog.confirm({
        title: 'Some confirm dialog title',
        onCancel: onCancelMock,
      });

      await waitFor(async () => {
        expect(
          await renderer.findByText(/Some confirm dialog title/),
        ).toBeInTheDocument();
      });

      act(async () => {
        fireEvent.click(await renderer.findByTestId('rovna-ui-dialog-cancel-button'));
      });

      await waitFor(() => {
        expect(onCancelMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});
