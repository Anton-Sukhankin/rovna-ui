import React from 'react';
import omit from 'lodash/omit';
import { Drawer, Spinner } from '@rovna-ui/primitives';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Text, Title } from '@rovna-ui/typography';
import {
  INTERNAL_RovnaUILogger as RovnaUILogger,
  isString,
  isUndefined,
} from '@rovna-ui/utils';

import { Form as _Form } from '@rovna-internal/components/components/Form';
import { Collapse } from '@rovna-internal/components/ui/Collapse';
import { GenericObject } from '@rovna-internal/components/types/GenericObject';
import { Box } from '@rovna-internal/components/grid/Box';
import { Badge } from '@rovna-internal/components/primitives/Badge';
import { Divider } from '@rovna-internal/components/ui/Divider';

import { AsyncCheckboxFilter } from './core/AsyncCheckboxFilter';
import { AsyncRadioFilter } from './core/AsyncRadioFilter';
import { AsyncSelectFilter } from './core/AsyncSelectFilter';
import { CheckboxFilter } from './core/CheckboxFilter';
import { CheckboxGroupFilter } from './core/CheckboxGroupFilter';
import { DatePickerFilter } from './core/DatePickerFilter';
import { InputFilter } from './core/InputFilter';
import { RadioFilter } from './core/RadioFilter';
import { RadioGroupFilter } from './core/RadioGroupFilter';
import { RangePickerFilter } from './core/RangePickerFilter';
import { ToggleFilter } from './core/ToggleFilter';
import { SelectFilter } from './core/SelectFilter';
import { CheckboxGroupSearchFilter } from './core/CheckboxGroupSearchFilter';
import { RadioGroupSearchFilter } from './core/RadioGroupSearchFilter';
import { InputNumberFilter } from './core/InputNumberFilter';
import { ResetButton } from './components/ResetButton';
import { Root } from './components/Root';
import { List } from './components/List';
import { Form } from './components/Form';
import { PresetsList } from './components/PresetsList';
import { SaveButton } from './components/SaveButton';
import { ResetAllButton } from './components/ResetAllButton';
import { FiltersProps } from './types';
import { useFilterCounter } from './hooks/useFilterCounter';
import { FilterComponent, FilterConfig } from './core/types';
import { useFiltersFormProvider } from './core/FiltersFormProvider';

const createReactKey = (config: FilterConfig) => {
  return config.key ?? `rovna-ui-filters-list-filter-${config.id}`;
};

const valuePropNameFactory = (config: FilterConfig) => {
  const isCheckable = ['toggle', 'checkbox', 'radio'].includes(
    config.component.component,
  );

  if (!isCheckable) return;

  return 'checked';
};

type FilterPickerProps = FilterComponent & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};

export const FilterPicker = React.memo<FilterPickerProps>(props => {
  switch (props.component) {
    case 'input':
      return <InputFilter {...omit(props, 'component')} />;
    case 'input-number':
      return <InputNumberFilter {...omit(props, 'component')} />;
    case 'select':
      return <SelectFilter {...omit(props, 'component')} />;
    case 'async-select':
      return <AsyncSelectFilter {...omit(props, 'component')} />;
    case 'async-checkbox':
      return <AsyncCheckboxFilter {...omit(props, 'component')} />;
    case 'async-radio':
      return <AsyncRadioFilter {...omit(props, 'component')} />;
    case 'toggle':
      return <ToggleFilter {...omit(props, 'component')} />;
    case 'checkbox':
      return <CheckboxFilter {...omit(props, 'component')} />;
    case 'checkbox-group':
      return <CheckboxGroupFilter {...omit(props, 'component')} />;
    case 'checkbox-group-search':
      return <CheckboxGroupSearchFilter {...omit(props, 'component')} />;
    case 'radio':
      return <RadioFilter {...omit(props, 'component')} />;
    case 'radio-group':
      return <RadioGroupFilter {...omit(props, 'component')} />;
    case 'radio-group-search':
      return <RadioGroupSearchFilter {...omit(props, 'component')} />;
    case 'date-picker':
      return <DatePickerFilter {...omit(props, 'component')} />;
    case 'range-picker':
      return <RangePickerFilter {...omit(props, 'component')} />;
    default:
      return <span>Filter is not supported</span>;
  }
});

const Filter = ({
  filter,
  INTERNAL_scope,
}: {
  filter: FilterConfig;
  INTERNAL_scope?: string;
}) => {
  if (process.env.NODE_ENV === 'development') {
    RovnaUILogger.warning([
      '<Filters /> из пакета "@rovna-ui/components" устарел и больше не поддерживается.',
      '',
      'Используйте <Filters /> из пакета "@rovna-ui/filters"',
    ]);
  }

  const { onClear } = useFiltersFormProvider('Filters.Filter');
  const name = INTERNAL_scope ? [INTERNAL_scope, filter.name] : filter.name;
  const count = useFilterCounter(name);

  const handleReset = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // Клик по кнопке триггерит закрытие колапса, предотвращаем
      // FIXME: Реализовать свойство "зона клика" в колапсе по подобию antd
      // чтобы можно было выбирать область срабатывания и не останавливать
      // всплытие ивента
      e.stopPropagation();
      onClear?.(filter.name);
    },
    [filter.name, onClear],
  );

  const shouldRender = typeof count === 'number' ? count > 0 : false;

  return (
    <Collapse
      id={filter.id}
      label={
        <Box
          $display='flex'
          $alignItems='center'
          $justifyContent='space-between'
          $width='100%'
          $minHeight='20px'
        >
          <Box $display='flex' $alignItems='center' $gap={4}>
            <Text strong>{filter.label}</Text>
            {shouldRender && <Badge preset='blue' inner={count} />}
          </Box>
          {shouldRender && <ResetButton filter={filter} onClick={handleReset} />}
        </Box>
      }
    >
      <_Form.Item noStyle name={name} valuePropName={valuePropNameFactory(filter)}>
        <FilterPicker
          config={filter}
          INTERNAL_scope={INTERNAL_scope}
          {...filter.component}
        />
      </_Form.Item>
    </Collapse>
  );
};

/**
 * @deprecated Компонент устарел и больше не поддерживается. Используйте компонент из пакета `@rovna-ui/filters`
 */
const Filters = <T extends GenericObject = GenericObject>({
  value,
  debounce = true,
  loading = false,
  open,
  name,
  title,
  filters,
  form,
  onFilterValuesChange,
  onClose,
  onFiltersReset,
  onFilterReset,
  resetAllButtonProps,
  INTERNAL_scope,

  showPresets = false,
  presets,
  defaultPresets,
  onPresetEdit,
  onPresetRemove,
  onPresetSave,
  onPresetsChange,
}: FiltersProps<T>) => {
  const [_form] = _Form.useForm<T>(form);
  const t = useTranslation();
  const _title = React.useMemo(() => {
    if (isUndefined(title))
      return (
        <Title margin='0' level='h5' style={{ flex: '1' }}>
          {t(['components', 'Filters', 'title'])}
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
    <Drawer.Root data-testid='rovna-ui-filters-drawer' open={open} onClose={onClose}>
      <Root<T>
        data-testid='rovna-ui-filters-root'
        debounce={debounce}
        value={value}
        filters={filters}
        name={name}
        form={_form}
        onFilterValuesChange={onFilterValuesChange}
        onFilterReset={onFilterReset}
        onFiltersReset={onFiltersReset}
        INTERNAL_scope={INTERNAL_scope}
        presets={presets}
        defaultPresets={defaultPresets}
        onPresetEdit={onPresetEdit}
        onPresetRemove={onPresetRemove}
        onPresetSave={onPresetSave}
        onPresetsChange={onPresetsChange}
      >
        <Drawer.Header>
          {_title}
          <Box $display='flex' $alignItems='center' $gap={8}>
            {showPresets && <SaveButton INTERNAL_scope={INTERNAL_scope} />}
            <ResetAllButton {...resetAllButtonProps} />
            <Drawer.CloseButton />
          </Box>
        </Drawer.Header>
        <Drawer.Body>
          <Spinner loading={loading}>
            <Form>
              <List>
                {showPresets && (
                  <>
                    <PresetsList INTERNAL_scope={INTERNAL_scope} />
                    <Divider padding='0' />
                  </>
                )}
                {filters.map(filter => (
                  <Filter
                    key={createReactKey(filter)}
                    filter={filter}
                    INTERNAL_scope={INTERNAL_scope}
                  />
                ))}
              </List>
            </Form>
          </Spinner>
        </Drawer.Body>
      </Root>
    </Drawer.Root>
  );
};

Filters.displayName = 'Filters';
Filters.Root = Root;
Filters.Form = Form;
Filters.List = List;
Filters.CollapseGroup = Collapse.Group;
Filters.Filter = Filter;

export { Filters };
