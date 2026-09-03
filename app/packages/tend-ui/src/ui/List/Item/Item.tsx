import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { Box } from '@rovna-internal/components/grid/Box';

import { Root } from './styled';
import { ItemComponent, ItemProps, ItemRef } from './types';
import { useListContext } from '../context';

const Item = React.forwardRef<ItemRef, ItemProps>(
  (
    { children, before, after, disabled = false, className, onClick, value, ...props },
    ref,
  ) => {
    const theme = useTheme();
    const context = useListContext();
    const onItemClick = context?.onItemClick;

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLLIElement>) => {
        if (disabled) return;
        onClick?.(e, value);
        onItemClick?.(value);
      },
      [disabled, onClick, onItemClick, value],
    );

    return (
      <Root
        {...props}
        ref={ref}
        theme={theme}
        $disabled={disabled}
        className={['rovna-ui-list-item', className].filter(Boolean).join(' ')}
        value={value}
        onClick={handleClick}
      >
        {before}
        <Box as='span' $width='100%'>
          {children}
        </Box>
        {after}
      </Root>
    );
  },
) as ItemComponent;

Item.displayName = 'List.Item';

export { Item };
