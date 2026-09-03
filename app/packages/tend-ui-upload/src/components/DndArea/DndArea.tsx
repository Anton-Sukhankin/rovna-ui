import React from 'react';
import { Upload } from '@rovna-ui/icons';
import { Paragraph, Text } from '@rovna-ui/typography';
import { useTheme } from '@rovna-ui/theme';
import cn from 'classnames';

import { useUploadContext } from '@rovna-internal/upload/core/context';

import { Root } from './styled';
import { DndAreaProps } from './types';

const DndArea = (props: DndAreaProps) => {
  const theme = useTheme();
  const upload = useUploadContext('Upload.DndArea');
  const [, setIsDragging] = React.useState(false);
  const [, setAmount] = React.useState(0);

  const isDisabled = upload.getIsDisabled();

  const handleDragEnter = React.useCallback((event: React.DragEvent) => {
    setIsDragging(true);
    setAmount(event.dataTransfer.items.length);
  }, []);
  const handleDragLeave = React.useCallback((event: React.DragEvent) => {
    if (
      event.relatedTarget instanceof HTMLElement &&
      event.currentTarget.contains(event.relatedTarget)
    ) {
      return;
    }

    setIsDragging(false);
    setAmount(0);
  }, []);
  const handleDragOver = React.useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isDisabled || (event.key !== 'Enter' && event.key !== ' ')) return;

      event.preventDefault();
      upload.getOpenHandler()();
    },
    [isDisabled, upload],
  );

  const color = isDisabled ? undefined : 'blue600';

  return (
    <Root
      {...props}
      theme={theme}
      $disabled={isDisabled}
      className={cn('rovna-ui-upload-drop-area', {
        'rovna-ui-upload-drop-area-disabled': isDisabled,
      })}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={(...args) => {
        upload.getOnDropHandler()(...args);
        setIsDragging(false);
      }}
      onClick={upload.getOpenHandler()}
      onKeyDown={handleKeyDown}
      tabIndex={isDisabled ? -1 : 0}
      role='button'
      aria-disabled={isDisabled}
    >
      <Upload mb={8} color='gray400' size={28} />
      <Paragraph disabled={isDisabled} margin={0} strong>
        Перетащите файл или{' '}
        <Text disabled={isDisabled} strong color={color}>
          загрузите
        </Text>
      </Paragraph>
      {props.description && (
        <Text mt={4} size='small' color='gray500'>
          {props.description}
        </Text>
      )}
      {props.limit && (
        <Text size='small' color='gray500'>
          {props.limit}
        </Text>
      )}
      {/* TODO: Сделать индикацию перетаскиваемых элементов */}
      {/* {ReactDOM.createPortal(
        <>
          {isDragging && (
            <DragOverlay
              style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
              }}
            >
              Перетаскиваются 10 файлов
            </DragOverlay>
          )}
        </>,
        document.body,
      )} */}
    </Root>
  );
};

DndArea.displayName = 'Upload.DndArea';

export { DndArea };
