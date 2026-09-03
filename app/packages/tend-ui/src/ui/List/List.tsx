import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { Text } from '@rovna-internal/components/typography/Text';
import { Box } from '@rovna-internal/components/grid/Box';

import { Root } from './styled';
import { Item } from './Item';
import { ListComponent, ListProps, ListRef } from './types';
import { ListContext } from './context';

const BaseList = <T extends string = string>(
  {
    gap,
    className,
    maxHeight,
    scrollable = false,
    onItemClick,
    header,
    tabIndex,
    ...props
  }: ListProps<T>,
  ref: React.ForwardedRef<ListRef>,
) => {
  const theme = useTheme();

  const handleItemClick = React.useCallback(
    (value: T) => {
      onItemClick?.(value);
    },
    [onItemClick],
  );

  const root = (
    <Root
      {...props}
      ref={ref}
      $theme={theme}
      $scrollable={scrollable}
      $maxHeight={maxHeight}
      $gap={gap}
      tabIndex={scrollable ? (tabIndex ?? 0) : tabIndex}
      className={['rovna-ui-list', className].filter(Boolean).join(' ')}
    />
  );

  return (
    <ListContext.Provider
      value={React.useMemo(() => ({ onItemClick: handleItemClick }), [handleItemClick])}
    >
      {header ? (
        <Box $display='flex' $flexDirection='column' $gap={8}>
          <Text color='gray650' size='small'>
            {header}
          </Text>
          {root}
        </Box>
      ) : (
        root
      )}
    </ListContext.Provider>
  );
};

const ForwardedList = React.forwardRef(BaseList) as ListComponent;
export const List = Object.assign(ForwardedList, {
  displayName: 'List',
  Item,
});
