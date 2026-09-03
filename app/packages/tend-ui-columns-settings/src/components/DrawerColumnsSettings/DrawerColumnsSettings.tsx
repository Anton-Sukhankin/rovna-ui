import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Drawer } from '@rovna-ui/primitives';
import { isString, isUndefined } from '@rovna-ui/utils';
import { Title } from '@rovna-ui/typography';
import { Box } from '@rovna-ui/grid';
import { Divider } from '@rovna-ui/components/ui';

import { DrawerColumnsSettingsProps } from './types';
import {
  ApplyButton,
  ColumnsSetting,
  List,
  PresetsList,
  ResetButton,
  Root,
  SavePresetButton,
} from './components';
import { ColumnConfig } from '../../core/interfaces';

const createReactKey = (config: ColumnConfig) => {
  return config.key ?? `rovna-ui-filters-list-filter-${config.id}`;
};

const BaseDrawerColumnsSettings = ({
  showPresets,
  open,
  title,
  onClose,
  onApply,
  onResetAll,
  settings,
  'aria-label': ariaLabel,
}: DrawerColumnsSettingsProps) => {
  const t = useTranslation();
  const defaultTitle = t(['components', 'ColumnsSettings', 'title']);
  const accessibleTitle = ariaLabel ?? (isString(title) ? title : defaultTitle);
  const _title = React.useMemo(() => {
    if (isUndefined(title))
      return (
        <Title margin='0' level='h5' style={{ flex: '1' }}>
          {defaultTitle}
        </Title>
      );

    if (isString(title))
      return (
        <Title margin='0' level='h5' style={{ flex: '1' }}>
          {title}
        </Title>
      );

    return title;
  }, [defaultTitle, title]);

  const columns = settings.getColumns().map(column => column.original);

  return (
    <Root settings={settings} onColumnDragEnd={settings.getMoveByIndexHandler()}>
      <Drawer.Root
        data-testid='rovna-ui-columns-settings-drawer'
        aria-label={accessibleTitle}
        open={open}
        onClose={(...parameters) => {
          settings.getPreviousResetHandler()();
          onClose?.(...parameters);
        }}
      >
        <Drawer.Header>
          {_title}
          <Box $display='flex' $alignItems='center' $gap={8}>
            <Drawer.CloseButton />
          </Box>
        </Drawer.Header>
        <Drawer.Body>
          <List columns={columns}>
            {showPresets && (
              <>
                <PresetsList />
                <Divider padding='0' />
              </>
            )}
            {settings.getColumns().map(column => (
              <ColumnsSetting key={createReactKey(column.original)} column={column} />
            ))}
          </List>
        </Drawer.Body>
        <Drawer.Footer>
          {showPresets && (
            <Box $flex={1}>
              <SavePresetButton columns={columns} />
            </Box>
          )}
          <ResetButton
            onClick={() => {
              settings.getDefaultResetHandler()();
              onResetAll?.();
            }}
          />
          <ApplyButton
            onClick={() => {
              settings.getApplyHandler()();
              onApply?.();
            }}
          />
        </Drawer.Footer>
      </Drawer.Root>
    </Root>
  );
};

const MemoizedBaseDrawerColumnsSettings = React.memo(BaseDrawerColumnsSettings);

export const DrawerColumnsSettings = Object.assign(MemoizedBaseDrawerColumnsSettings, {
  displayName: 'DrawerColumnsSettings',
  Root,
  List,
  ColumnsSetting,
  ResetButton,
});
