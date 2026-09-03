import React from 'react';
import { useTranslation } from '@rovna-ui/locale';
import { Done } from '@rovna-ui/icons/Done';
import { ArrowUp } from '@rovna-ui/icons/ArrowUp';
import { ArrowDown } from '@rovna-ui/icons/ArrowDown';

import { List } from '@rovna-internal/components/ui/List';
import { SortingOrder } from '@rovna-internal/components/features/Table/types/SortingOrder';
import { contextFactory } from '@rovna-internal/components/factories/contextFactory';
import { SorterConfig } from '@rovna-internal/components/features/Table/types';

import { ListItem } from './styled';
import { ItemProps } from './types';
import { useSorterContext } from '../../contexts/SorterContext';

type ToggleSorterContextType = {
  variant: NonNullable<SorterConfig['variant']>;
  order: SortingOrder;
  disabled?: boolean;
  onAscending?: () => void;
  onDescending?: () => void;
};
const [ToggleSorterContext, useToggleSorterContext] =
  contextFactory<ToggleSorterContextType>();

type AscendingProps = React.ComponentPropsWithoutRef<typeof List.Item>;

const Ascending = ({ ...rest }: AscendingProps) => {
  const { disabled, order, variant, onAscending } = useToggleSorterContext();
  const t = useTranslation();

  return (
    <ListItem
      disabled={disabled}
      before={<ArrowUp color='gray500' />}
      after={order === 'ascend' && <Done color='blue600' />}
      onClick={onAscending}
      {...rest}
    >
      {t(['features', 'Table', 'ascending', variant])}
    </ListItem>
  );
};

type DescendingProps = React.ComponentPropsWithoutRef<typeof List.Item>;
const Descending = ({ ...rest }: DescendingProps) => {
  const { disabled, order, variant, onDescending } = useToggleSorterContext();
  const t = useTranslation();

  return (
    <ListItem
      disabled={disabled}
      before={<ArrowDown color='gray500' />}
      after={order === 'descend' && <Done color='blue600' />}
      onClick={onDescending}
      {...rest}
    >
      {t(['features', 'Table', 'descending', variant])}
    </ListItem>
  );
};

const Layout: React.FC = ({ children }) => {
  return <List>{children}</List>;
};

const ToggleSorter = ({ value = 'default', onChange, children }: ItemProps) => {
  // FIXME:
  // Breaking the dependency inversion principle:
  // "ToggleSorter" singleton component is bounded to context value
  // Need one more abstraction layer
  const { disabled, variant = 'default' } = useSorterContext();
  const [order, setOrder] = React.useState<SortingOrder>(value);

  React.useEffect(() => {
    if (!value) return;
    setOrder(value);
  }, [value]);

  const onAscending = React.useCallback(() => {
    setOrder(prevOrder => {
      const next = {
        ascend: 'default',
        default: 'ascend',
        descend: 'ascend',
      }[prevOrder] as SortingOrder;

      onChange?.(next);

      return next;
    });
  }, [onChange]);

  const onDescending = React.useCallback(() => {
    setOrder(prevOrder => {
      const next = {
        descend: 'default',
        default: 'descend',
        ascend: 'descend',
      }[prevOrder] as SortingOrder;

      onChange?.(next);

      return next;
    });
  }, [onChange]);

  return (
    <ToggleSorterContext
      value={React.useMemo(
        () => ({
          variant,
          disabled,
          order,
          onAscending,
          onDescending,
        }),
        [disabled, onAscending, onDescending, order, variant],
      )}
    >
      {children}
    </ToggleSorterContext>
  );
};

ToggleSorter.displayName = 'ToggleSorter';
ToggleSorter.Layout = Layout;
ToggleSorter.Ascending = Ascending;
ToggleSorter.Descending = Descending;

export { ToggleSorter };
