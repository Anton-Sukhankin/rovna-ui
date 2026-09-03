import React from 'react';
import { useTranslation } from '@rovna-ui/locale';
import { ArrowDown, ArrowUp, Done } from '@rovna-ui/icons';
import { List } from '@rovna-ui/components/ui';
import { UNSTABLE_useControllableStateV2 as useControllableState } from '@rovna-ui/hooks';

import { SortingOrder } from '@rovna-internal/table/Table/types/SortingOrder';

import { ToggleSorterProps } from './types';
import { ListItem } from './styled';

const ToggleSorter = ({
  value = 'default',
  variant = 'default',
  onChange,
  disabled,
}: ToggleSorterProps) => {
  const t = useTranslation();
  const [order, setOrder] = useControllableState({
    value,
    onChange,
  });

  const onAscending = React.useCallback(() => {
    setOrder((prevOrder = 'default') => {
      const next = {
        ascend: 'default',
        default: 'ascend',
        descend: 'ascend',
      }[prevOrder] as SortingOrder;

      return next;
    });
  }, [setOrder]);

  const onDescending = React.useCallback(() => {
    setOrder((prevOrder = 'default') => {
      const next = {
        descend: 'default',
        default: 'descend',
        ascend: 'descend',
      }[prevOrder] as SortingOrder;

      return next;
    });
  }, [setOrder]);

  return (
    <List>
      <ListItem
        disabled={disabled}
        before={<ArrowUp color='gray500' />}
        after={order === 'ascend' && <Done color='blue600' />}
        onClick={onAscending}
      >
        {t(['features', 'Table', 'ascending', variant])}
      </ListItem>
      <ListItem
        disabled={disabled}
        before={<ArrowDown color='gray500' />}
        after={order === 'descend' && <Done color='blue600' />}
        onClick={onDescending}
      >
        {t(['features', 'Table', 'descending', variant])}
      </ListItem>
    </List>
  );
};

ToggleSorter.displayName = 'ToggleSorter';

export { ToggleSorter };
