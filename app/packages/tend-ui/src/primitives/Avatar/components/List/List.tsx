import React from 'react';

import { isUndefined } from '@rovna-internal/components/utils';

import { Avatar } from '../Avatar';
import { Root } from './styled';
import { ListProps, ListRef } from './types';

const List = React.forwardRef<ListRef, ListProps>(({ children, max, ...props }, ref) => {
  const _children = React.useMemo(() => {
    if (isUndefined(max)) return children;
    const nodes = React.Children.map(children, child => child);
    if (!nodes) return children;

    const amount = nodes.length || 0;
    const shown = nodes.slice(0, max);
    const message = `+${amount - max}`;
    shown.push(<Avatar>{message}</Avatar>);

    return shown;
  }, [children, max]);

  return (
    <Root {...props} ref={ref}>
      {_children}
    </Root>
  );
});

List.displayName = 'Avatar.List';

export { List };
