import React from 'react';
import { ArrowUp } from '@rovna-ui/icons/ArrowUp';
import { ArrowDown } from '@rovna-ui/icons/ArrowDown';

import { SortingOrder } from '@rovna-internal/components/features/Table/types/SortingOrder';

import { ToggleSorterProps } from './types';
import { Root } from './styled';

export const ToggleSorter = ({
  disabled,
  order = ['default', 'ascend', 'descend'],
  value,
  children,
  onChange,
}: ToggleSorterProps) => {
  const [state, setState] = React.useState<SortingOrder>(value ?? 'default');
  React.useEffect(() => {
    if (!value) return;
    setState(value);
  }, [value]);

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
      onChange?.(next);
    },
    [onChange, order],
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
