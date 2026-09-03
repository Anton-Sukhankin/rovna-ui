import React from 'react';
import { Button } from '@rovna-ui/primitives';
import { Upload } from '@rovna-ui/icons';

import { useUploadContext } from '@rovna-internal/upload/core/context';

const UploadButton = ({
  fullWidth,
  children = 'Загрузить файл',
}: {
  fullWidth?: boolean;
  children?: React.ReactNode;
}) => {
  const upload = useUploadContext('UploadButton.UploadButton');

  return (
    <Button
      fullWidth={fullWidth}
      type='button'
      onClick={upload.getOpenHandler()}
      className='rovna-ui-upload-trigger'
      before={<Upload />}
      variant='secondary'
      mb={8}
      disabled={upload.getIsDisabled()}
    >
      {children}
    </Button>
  );
};

UploadButton.displayName = 'UploadButton.Button';

export { UploadButton };
