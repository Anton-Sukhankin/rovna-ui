import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { Attachment } from '@rovna-internal/upload/core/interfaces';

import { useUpload } from './useUpload';
import { OnUploadOptions } from '../interfaces/Upload';

const createFileList = (...files: File[]) =>
  Object.assign(files, {
    item: (index: number) => files[index] ?? null,
  }) as unknown as FileList;

const selectFiles = (onChange: React.ChangeEventHandler<HTMLInputElement>, files: File[]) => {
  act(() => {
    onChange({ target: { files: createFileList(...files) } } as unknown as React.ChangeEvent<HTMLInputElement>);
  });
};

const deferred = <T,>() => {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });

  return { promise, reject, resolve };
};

describe('useUpload', () => {
  it('uploads files and exposes progress, message and successful result', async () => {
    const onUpload = jest.fn(
      async (attachments: Attachment[], options: OnUploadOptions) => {
        const [attachment] = attachments;
        options.setProgress(attachment.uuid, 45);
        options.setMessage(attachment.uuid, 'Загрузка');

        return [{ ...attachment, progress: 100, source: '/files/report.txt', status: 'uploaded' as const }];
      },
    );
    const { result, waitFor } = renderHook(() => useUpload({ onUpload }));
    const inputProps = result.current.getInputProps();

    selectFiles(inputProps.onChange!, [new File(['report'], 'report.txt', { type: 'text/plain' })]);

    await waitFor(() => expect(onUpload).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      const [file] = result.current.getFiles();
      expect(file.getStatus()).toBe('uploaded');
      expect(file.getProgress()).toBe(100);
      expect(file.getSource()).toBe('/files/report.txt');
    });
  });

  it('marks every selected file as failed when upload rejects', async () => {
    const { result, waitFor } = renderHook(() =>
      useUpload({ onUpload: () => Promise.reject(new Error('Upload failed')) }),
    );

    selectFiles(result.current.getInputProps().onChange!, [
      new File(['report'], 'report.txt', { type: 'text/plain' }),
    ]);

    await waitFor(() => {
      expect(result.current.getFiles()[0].getStatus()).toBe('error');
    });
  });

  it('keeps a removed file cancelled when an in-flight upload resolves', async () => {
    const upload = deferred<Attachment[]>();
    const onUpload = jest.fn(() => upload.promise);
    const { result, waitFor } = renderHook(() => useUpload({ onUpload }));

    selectFiles(result.current.getInputProps().onChange!, [
      new File(['report'], 'report.txt', { type: 'text/plain' }),
    ]);
    await waitFor(() => expect(onUpload).toHaveBeenCalledTimes(1));
    const [attachment] = onUpload.mock.calls[0][0] as Attachment[];

    act(() => result.current.remove(attachment.uuid));
    expect(result.current.getFiles()).toHaveLength(0);

    await act(async () => upload.resolve([{ ...attachment, status: 'uploaded' }]));

    expect(result.current.getFiles()).toHaveLength(0);
  });

  it('does not publish async updates after unmount', async () => {
    const upload = deferred<Attachment[]>();
    const onChange = jest.fn();
    const onUpload = jest.fn(() => upload.promise);
    const { result, unmount, waitFor } = renderHook(() =>
      useUpload({ onChange, onUpload }),
    );

    selectFiles(result.current.getInputProps().onChange!, [
      new File(['report'], 'report.txt', { type: 'text/plain' }),
    ]);
    await waitFor(() => expect(onUpload).toHaveBeenCalledTimes(1));
    const callsBeforeUnmount = onChange.mock.calls.length;
    const [attachment] = onUpload.mock.calls[0][0] as Attachment[];

    unmount();
    await act(async () => upload.resolve([{ ...attachment, status: 'uploaded' }]));

    expect(onChange).toHaveBeenCalledTimes(callsBeforeUnmount);
  });

  it('retains selected files when no upload handler is provided', async () => {
    const { result, waitFor } = renderHook(() => useUpload({}));

    selectFiles(result.current.getInputProps().onChange!, [
      new File(['draft'], 'draft.txt', { type: 'text/plain' }),
    ]);

    await waitFor(() => expect(result.current.getFiles()).toHaveLength(1));
    expect(result.current.getFiles()[0].name).toBe('draft');
  });
});
