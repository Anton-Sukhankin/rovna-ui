import React from 'react';
import AntConfigProvider from 'antd-core/es/config-provider';
import AntTable from 'antd-core/es/table';
import { Empty, Spinner } from '@rovna-ui/primitives';
import { GenericObject } from '@rovna-ui/types';
import { useTheme } from '@rovna-ui/theme';
import cn from 'classnames';

import { Root } from './styled';
import { TableComponent, TableProps, TableRef } from './types';
import { useColumns, useSize } from './hooks';
import { TextCell, TextHeader } from './components';

const BaseTable = <T extends GenericObject = GenericObject>(
  { size = 'medium', empty, loading = false, ...props }: TableProps<T>,
  ref: React.ForwardedRef<TableRef>,
) => {
  const theme = useTheme();
  const __size = useSize(size);
  const columns = useColumns(props.columns);
  const isRowCursorPointer = typeof props?.onRow?.({} as T)?.onClick === 'function';
  const renderEmpty = React.useCallback(
    () => <Empty description='Нет данных' {...empty} />,
    [empty],
  );
  const __loading = React.useMemo(
    () => ({ indicator: <Spinner size='small' loading={loading} />, spinning: loading }),
    [loading],
  );

  React.useLayoutEffect(() => {
    document
      .querySelectorAll<HTMLElement>('[class*="-table-content"]')
      .forEach(content => {
        content.tabIndex = 0;
        content.setAttribute('role', 'region');
        if (!content.hasAttribute('aria-label')) {
          content.setAttribute('aria-label', 'Прокручиваемая таблица');
        }
      });
  });

  return (
    <AntConfigProvider renderEmpty={renderEmpty}>
      <Root<T>
        data-testid='rovna-ui-table'
        {...props}
        $theme={theme}
        $pointer={isRowCursorPointer}
        ref={ref}
        $size={size}
        size={__size}
        columns={columns}
        loading={__loading}
        rootClassName={cn([props.rootClassName], {
          'rovna-ui-table-large': __size === 'large',
        })}
        pagination={false}
      />
    </AntConfigProvider>
  );
};

const _Table = React.forwardRef(BaseTable) as TableComponent;

const Table = Object.assign(_Table, {
  displayName: 'Table',
  TextCell,
  TextHeader,
  Summary: AntTable.Summary,
});

export { Table };
