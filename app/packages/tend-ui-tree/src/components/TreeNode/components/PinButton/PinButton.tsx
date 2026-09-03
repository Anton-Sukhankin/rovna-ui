import React from 'react';
import { Pin } from '@rovna-ui/icons/Pin';
import { useTheme } from '@rovna-ui/theme';
import { useCallbackRef } from '@rovna-ui/hooks';

import { TreeData } from '@rovna-internal/tree/core';

import { Button } from './styled';
import { PinButtonProps } from './types';

export const PinButton = <T extends TreeData = TreeData>({
  context,
}: PinButtonProps<T>) => {
  const theme = useTheme();
  const isPinned = context.row.getIsPinned();

  const handleClick = useCallbackRef((e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPinned) {
      context.row.pin(false);

      return;
    }
    context.row.pin('top');
  });

  return (
    <Button
      theme={theme}
      data-testid={`rovna-ui-tree-node-pin-button-${context.row.id}`}
      className='rovna-ui-tree-node-pin-button'
      aria-label={`${isPinned ? 'Открепить' : 'Закрепить'} узел «${context.row.original.value}»`}
      onClick={handleClick}
      type='button'
    >
      <Pin size={16} color={isPinned ? 'blue600' : 'gray500'} onClick={handleClick} />
    </Button>
  );
};
