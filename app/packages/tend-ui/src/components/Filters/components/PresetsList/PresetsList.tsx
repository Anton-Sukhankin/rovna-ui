import React from 'react';
import { Box } from '@rovna-ui/grid/Box';
import { Text } from '@rovna-ui/typography';
import { useKeyPress } from '@rovna-ui/hooks';
import { MoreVert } from '@rovna-ui/icons/MoreVert';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

import {
  useFiltersContext,
  useFiltersPresetsProvider,
} from '@rovna-internal/components/components/Filters/contexts';
import { Radio } from '@rovna-internal/components/primitives/Radio';
import { Dropdown } from '@rovna-internal/components/primitives/Dropdown';
import { Collapse } from '@rovna-internal/components/ui/Collapse';

import { Input } from './Input';
import { FilterPreset } from '../../core/types';
import { useValuesObserver } from '../../hooks/useValuesObserver';

interface ItemProps {
  checked?: boolean;
  preset: FilterPreset;
  onClick?: (preset: FilterPreset) => void;
  onRemove?: (preset: FilterPreset) => void;
  onEdit?: (preset: FilterPreset) => void;
  INTERNAL_scope?: string;
}

const Item = ({ preset, onClick, onRemove, onEdit, INTERNAL_scope }: ItemProps) => {
  const ctx = useFiltersContext('Item');
  const values = useValuesObserver('PresetsList.Item', ctx.form, INTERNAL_scope);

  const [value, setValue] = React.useState(preset.label);
  const [editing, setEditing] = React.useState(false);

  const checked = React.useMemo(
    () => isEqual(pickBy(values, identity), preset.value),
    [preset.value, values],
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

const PresetsList = ({ INTERNAL_scope }: { INTERNAL_scope?: string }) => {
  const model = useFiltersPresetsProvider('Filters.PresetsList');

  const text = model.presets.length
    ? `Сохраненные фильтры: ${model.presets.length}`
    : 'Сохраненные фильтры';

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
      {model.presets.length > 0 ? (
        <Box $display='flex' $flexDirection='column' $gap={8}>
          {model.presets.map(preset => (
            <Item
              key={preset.id}
              preset={preset}
              onClick={model.onApply}
              onRemove={model.onRemove}
              onEdit={model.onEdit}
              INTERNAL_scope={INTERNAL_scope}
            />
          ))}
        </Box>
      ) : (
        <Text color='gray500'>Нет сохраненных фильтров</Text>
      )}
    </Collapse>
  );
};

export { PresetsList };
