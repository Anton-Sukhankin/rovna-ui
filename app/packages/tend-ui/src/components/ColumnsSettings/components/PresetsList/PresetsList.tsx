import React from 'react';
import { Box } from '@rovna-ui/grid/Box';
import { Text } from '@rovna-ui/typography';
import { useKeyPress } from '@rovna-ui/hooks';
import { MoreVert } from '@rovna-ui/icons/MoreVert';
import isEqual from 'lodash/isEqual';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

import { Dropdown } from '@rovna-internal/components/primitives/Dropdown';
import { Radio } from '@rovna-internal/components/primitives/Radio';
import { Collapse } from '@rovna-internal/components/ui/Collapse';
import { useColumnsSettingsPresetsProvider } from '@rovna-internal/components/components/ColumnsSettings/contexts/PresetsContext';
import {
  ColumnConfig,
  ColumnsSettingsPreset,
} from '@rovna-internal/components/components/ColumnsSettings/core';
import { mapColumnsForPreset } from '@rovna-internal/components/components/ColumnsSettings/utils/mapColumnsForPreset';

import { Input } from './Input';

type ItemProps<T extends ColumnConfig = ColumnConfig> = {
  columns: T[];
  checked?: boolean;
  preset: ColumnsSettingsPreset;
  onClick?: (preset: ColumnsSettingsPreset) => void;
  onRemove?: (preset: ColumnsSettingsPreset) => void;
  onEdit?: (preset: ColumnsSettingsPreset) => void;
};

const Item = <T extends ColumnConfig = ColumnConfig>({
  columns,
  preset,
  onClick,
  onRemove,
  onEdit,
}: ItemProps<T>) => {
  const [value, setValue] = React.useState(preset.label);
  const [editing, setEditing] = React.useState(false);
  const comparing = React.useMemo(
    () => mapColumnsForPreset(columns).map(column => omitBy(column, isNil)),
    [columns],
  );

  const checked = React.useMemo(
    () => isEqual(comparing, preset.value),
    [comparing, preset.value],
  );

  useKeyPress('Enter', () => {
    if (!editing) return;
    onEdit?.({ ...preset, label: value });
    setEditing(false);
    setValue('');
  });

  return (
    <Box $display='flex' $alignItems='center' $gap={8}>
      <Radio
        checked={checked}
        value={preset.id}
        onChange={React.useCallback(() => {
          onClick?.(preset);
        }, [onClick, preset])}
      >
        {editing ? (
          <Input onChange={e => setValue(e.target.value)} value={value} />
        ) : (
          preset.label
        )}
      </Radio>
      <Box $display='flex' $justifyContent='flex-end' $flex='1'>
        <Dropdown
          items={React.useMemo(
            () => [
              { key: '1', label: 'Переименовать', onClick: () => setEditing(true) },
              { key: '2', label: 'Удалить', onClick: () => onRemove?.(preset) },
            ],
            [onRemove, preset],
          )}
        >
          <MoreVert cursor='pointer' size={16} />
        </Dropdown>
      </Box>
    </Box>
  );
};

// TODO: Нужно передавать значение колонок через контекст
// так как PresetList может отдаваться наружу в публичное compound API
const PresetsList = <T extends ColumnConfig = ColumnConfig>({
  columns,
}: {
  columns: T[];
}) => {
  const model = useColumnsSettingsPresetsProvider('ColumnsSettings.PresetsList');

  const text = model.presets?.length
    ? `Сохраненные колонки: ${model.presets.length}`
    : 'Сохраненные колонки';

  return (
    <Collapse
      label={
        <Box
          $display='flex'
          $alignItems='center'
          $justifyContent='space-between'
          $width='100%'
          $minHeight='20px'
        >
          <Box $display='flex' $alignItems='center' $gap={4}>
            <Text strong>{text}</Text>
          </Box>
        </Box>
      }
    >
      {model.presets?.length > 0 ? (
        <Box $display='flex' $flexDirection='column' $gap={8}>
          {model.presets?.map(preset => (
            <Item
              key={preset.id}
              columns={columns}
              preset={preset}
              onClick={model.onPresetApply}
              onRemove={model.onPresetRemove}
              onEdit={model.onPresetEdit}
            />
          ))}
        </Box>
      ) : (
        <Text color='gray500'>Нет сохраненных колонок</Text>
      )}
    </Collapse>
  );
};

PresetsList.displayName = 'ColumnsSettings.PresetsList';

export { PresetsList };
