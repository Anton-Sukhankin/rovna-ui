import React from 'react';

import { useTableColumns } from '@rovna-internal/components/features/Table/hooks/useTableColumns';
import { ColumnConfig } from '@rovna-internal/components/features/Table/types';

import { useColumnContext } from '../../contexts/ColumnContext';
import { Layout } from './components/Layout';
import { HidingButton } from './components/HidingButton';
import { PinningButton } from './components/PinningButton';

const ColumnActions = <T extends ColumnConfig = ColumnConfig>() => {
  const column = useColumnContext<T>();
  const { display, pin } = useTableColumns<T>();

  return (
    <Layout>
      <PinningButton
        pinned={!!column.fixed}
        disabled={!column.pinnable}
        onChange={p => {
          pin(p, column);
          // Force dropdown layout re-aligning after column moving
          setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
          }, 0);
        }}
      />
      <HidingButton
        disabled={column.disabled}
        onClick={() => {
          display(false, column);
        }}
      />
    </Layout>
  );
};

ColumnActions.displayName = 'ContextMenu.ColumnActions';
ColumnActions.Layout = Layout;
ColumnActions.PinningButton = PinningButton;
ColumnActions.HidingButton = HidingButton;

export { ColumnActions };
