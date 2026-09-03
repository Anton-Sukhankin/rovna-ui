import React from 'react';
import { ArrowDown, ArrowUp } from '@rovna-ui/icons';
import { useControllableState } from '@rovna-ui/hooks';

import { SortingOrder } from '@rovna-internal/table/Table/types/SortingOrder';

import { ToggleSorterProps } from './types';
import { Root } from './styled';

export const ToggleSorter = ({
  disabled,
  order = ['default', 'ascend', 'descend'],
  value,
  children,
  onChange,
}: ToggleSorterProps) => {
  const [state, setState] = useControllableState({
    value,
    defaultValue: 'default',
    onChange,
  });

  const icon = React.useMemo(() => {
    if (state === 'default') return null;
    if (state === 'ascend') return <ArrowUp />;

    return <ArrowDown />;
  }, [state]);

  const handleClick = React.useCallback(
    (_, value?: SortingOrder) => {
      if (!value) return;
      const current = order.indexOf(value);
      const idx = (current + 1) % order.length;
      const next = order[idx];
      setState(next);
    },
    [order, setState],
  );

  return (
    <Root<SortingOrder>
      disabled={disabled}
      value={state}
      after={icon}
      onClick={handleClick}
    >
      {children}
    </Root>
  );
};
