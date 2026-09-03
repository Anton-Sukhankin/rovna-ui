import React from 'react';
import { Button, Modal } from '@rovna-ui/components/primitives';

import { UploadContext } from '@rovna-internal/upload/core/context';
import { useUpload } from '@rovna-internal/upload/core/useUpload';
import { UploadAreaRef } from '@rovna-internal/upload/types';

import { Root as _Root } from './styled';
import { RootProps } from './types';

const Root = React.forwardRef<UploadAreaRef, React.PropsWithChildren<RootProps>>(
  (
    { children, getAttachmentAfter, getAttachmentBefore, getAttachmentActions, ...props },
    ref,
  ) => {
    const upload = useUpload(props);

    React.useImperativeHandle(ref, () => ({
      setProgress: upload.setProgress,
      setMessage: upload.setMessage,
    }));

    const onCloseModal = React.useCallback(() => {
      upload.setIsMaxExceeded(false);
    }, [upload]);

    return (
      <_Root className='rovna-ui-upload-root'>
        <UploadContext
          {...upload}
          getAttachmentAfter={getAttachmentAfter}
          getAttachmentBefore={getAttachmentBefore}
          getAttachmentActions={getAttachmentActions}
        >
          {children}
          <input {...upload.getInputProps()} />
          <Modal
            open={upload.getIsMaxExceeded()}
            title='Ошибка'
            onCancel={onCloseModal}
            footer={
              <Button type='button' onClick={onCloseModal}>
                Закрыть
              </Button>
            }
          >
            Вы можете прикрепить не более {props.max} файлов
          </Modal>
        </UploadContext>
      </_Root>
    );
  },
);

Root.displayName = 'Upload.Root';

export { Root };
