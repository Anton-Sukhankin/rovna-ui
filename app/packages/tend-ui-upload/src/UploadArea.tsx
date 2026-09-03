import React from 'react';

import { DndArea } from './components/DndArea';
import { FilesList } from './components/FilesList';
import { Root } from './components/Root';
import { UploadAreaProps, UploadAreaRef } from './types';

const UploadArea = React.forwardRef<UploadAreaRef, UploadAreaProps>(
  (props: UploadAreaProps, ref) => {
    return (
      <Root {...props} ref={ref}>
        <DndArea
          description={props.description}
          limit={props.limit}
          aria-invalid={props['aria-invalid']}
        />
        <FilesList />
      </Root>
    );
  },
);

UploadArea.displayName = 'UploadArea';

export { UploadArea };
