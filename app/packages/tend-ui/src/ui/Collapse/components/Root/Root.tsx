import React from 'react';

import { RootProps, RootRef } from './types';
import { Root as SRoot } from './styled';
import { CollapseContext } from '../../contexts/CollapseContext';
import { useGroupContext } from '../../contexts/GroupContext';

const Root = React.forwardRef<RootRef, RootProps>(
  ({ open = false, onOpenChange, children, id = '' }, ref) => {
    const groupContext = useGroupContext();
    const defaultOpen = groupContext?.defaultOpen?.includes(id) ?? open;
    const [_open, _setOpen] = React.useState(defaultOpen);

    const handleClick = React.useCallback(() => {
      _setOpen(previousCollapsed => {
        const next = !previousCollapsed;
        onOpenChange?.(next);

        return next;
      });
    }, [onOpenChange]);

    return (
      <CollapseContext
        value={React.useMemo(
          () => ({ open: _open, onClick: handleClick }),
          [_open, handleClick],
        )}
      >
        <SRoot ref={ref} className='rovna-ui-collapse-root'>
          {children}
        </SRoot>
      </CollapseContext>
    );
  },
);

Root.displayName = 'Collapse.Root';

export { Root };
