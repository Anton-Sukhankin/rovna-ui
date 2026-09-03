import React from 'react';

import { FilesList } from './components/FilesList';
import { Root } from './components/Root';
import { UploadButton as _UploadButton } from './components/UploadButton';
import { UploadButtonProps, UploadButtonRef } from './types';

const BaseUploadButton = React.forwardRef<UploadButtonRef, UploadButtonProps>(
  ({ fullWidth, children, ...props }: UploadButtonProps, ref) => {
    return (
      <Root {...props} ref={ref}>
        <_UploadButton fullWidth={fullWidth}>{children}</_UploadButton>
        <FilesList />
      </Root>
    );
  },
);

const UploadButton = Object.assign(BaseUploadButton, {
  displayName: 'UploadButton',
  Root,
  Button: _UploadButton,
  FilesList,
});

export { UploadButton };
