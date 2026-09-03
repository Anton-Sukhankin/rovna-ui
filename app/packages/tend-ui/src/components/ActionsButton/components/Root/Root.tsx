import React from 'react';

import { Dropdown } from '@rovna-internal/components/primitives/Dropdown';
import { useBoolean } from '@rovna-internal/components/hooks/useBoolean';
import { ActionsButtonContext } from '@rovna-internal/components/components/ActionsButton/contexts';

import { RootProps } from './types';

const Root = ({ items = [], onOpenChange, ...props }: RootProps) => {
  const menu = React.useMemo(() => ({ items }), [items]);
  const [open, display] = useBoolean();

  return (
    <ActionsButtonContext
      value={React.useMemo(() => ({ open, display }), [open, display])}
    >
      <Dropdown
        trigger={['click']}
        open={open}
        menu={menu}
        {...props}
        onOpenChange={(v, info) => {
          display(v);
          onOpenChange?.(v, info);
        }}
      />
    </ActionsButtonContext>
  );
};

Root.displayName = 'ActionsButton.Root';

export { Root };
