import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Drawer } from '@rovna-ui/primitives';
import {
  INTERNAL_RovnaUILogger as RovnaUILogger,
  isString,
  isUndefined,
} from '@rovna-ui/utils';
import { Title } from '@rovna-ui/typography';
import { Box } from '@rovna-ui/grid';

import { Divider } from '@rovna-internal/components/ui/Divider';

import { ColumnsSettingsProps } from './types';
import {
  ColumnsSetting,
  List,
  PresetsList,
  ResetButton,
  Root,
  SavePresetButton,
} from './components';
import { ColumnConfig } from './core/interfaces/ColumnConfig';

const createReactKey = (config: ColumnConfig) => {
  return config.key ?? `rovna-ui-filters-list-filter-${config.id}`;
};

const BaseColumnsSettings = <T extends ColumnConfig = ColumnConfig>({
  title,
  columns,
  onColumnVisibilityChange,
  onColumnDragEnd,
  onColumnsReset,
  onColumnPinningChange,
  showPresets = false,
  defaultPresets,
  onPresetApply,
  onPresetEdit,
  onPresetRemove,
  onPresetSave,
  ...props
}: ColumnsSettingsProps<T>) => {
  if (process.env.NODE_ENV === 'development') {
    RovnaUILogger.warning([
      '<ColumnsSettings /> из пакета "@rovna-ui/components" устарел и больше не поддерживается.',
      '',
      'Используйте <DrawerColumnsSettings /> из пакета "@rovna-ui/columns-settings".',
      '',
    ]);
  }

  const t = useTranslation();
  const _title = React.useMemo(() => {
    if (isUndefined(title))
      return (
        <Title margin='0' level='h5' style={{ flex: '1' }}>
          {t(['components', 'ColumnsSettings', 'title'])}
        </Title>
      );

    if (isString(title))
      return (
        <Title margin='0' level='h5' style={{ flex: '1' }}>
          {title}
        </Title>
      );

    return title;
  }, [t, title]);

  return (
    <Root
      columns={columns}
      onColumnDragEnd={onColumnDragEnd}
      defaultPresets={defaultPresets}
      onPresetApply={onPresetApply}
      onPresetEdit={onPresetEdit}
      onPresetRemove={onPresetRemove}
      onPresetSave={onPresetSave}
    >
      <Drawer.Root data-testid='rovna-ui-columns-settings-drawer' {...props}>
        <Drawer.Header>
          {_title}
          <Box $display='flex' $alignItems='center' $gap={8}>
            {showPresets && <SavePresetButton columns={columns} />}
            <ResetButton onClick={onColumnsReset} />
            <Drawer.CloseButton />
          </Box>
        </Drawer.Header>
        <Drawer.Body>
          <List columns={columns}>
            {showPresets && (
              <>
                <PresetsList columns={columns} />
                <Divider padding='0' />
              </>
            )}
            {columns.map(column => (
              <ColumnsSetting
                key={createReactKey(column)}
                column={column}
                onColumnPinningChange={onColumnPinningChange}
                onColumnVisibilityChange={onColumnVisibilityChange}
              />
            ))}
          </List>
        </Drawer.Body>
      </Drawer.Root>
    </Root>
  );
};

const MemoizedBaseColumnsSettings = React.memo(BaseColumnsSettings);

/**
 * @deprecated Компонент устарел и больше не поддерживается.
 * Используйте компонент из пакета `@rovna-ui/columns-settings`.
 */
export const ColumnsSettings = Object.assign(MemoizedBaseColumnsSettings, {
  displayName: 'ColumnsSettings',
  Root,
  List,
  ColumnsSetting,
  ResetButton,
});
