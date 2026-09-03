import React from 'react';
import { Drawer, Spinner } from '@rovna-ui/primitives';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Text, Title } from '@rovna-ui/typography';
import { isString, isUndefined } from '@rovna-ui/utils';
import { Form as _Form } from '@rovna-ui/components/components/Form';
import { Collapse, Divider } from '@rovna-ui/components/ui';
import { GenericObject } from '@rovna-ui/components/types';
import { Box } from '@rovna-ui/grid/Box';
import { Badge } from '@rovna-ui/components/primitives';

import { ResetButton } from './components/ResetButton';
import { Root } from './components/Root';
import { List } from './components/List';
import { Form } from './components/Form';
import { PresetsList } from './components/PresetsList';
import { SaveButton } from './components/SaveButton';
import { ResetAllButton } from './components/ResetAllButton';
import { ApplyButton } from './components/ApplyButton';
import { FiltersProps } from './types';
import { useFilterCounter } from './hooks/useFilterCounter';
import { FilterConfig } from './core/types';
import { useFiltersFormProvider } from './core/FiltersFormProvider';
import { INTERNAL_FilterPicker as FilterPicker } from './FilterPicker';
import { createReactKey, valuePropNameFactory } from './utils';

const Filter = ({
  filter,
  INTERNAL_scope,
}: {
  filter: FilterConfig;
  INTERNAL_scope?: string;
}) => {
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

  const shouldRender = count > 0;

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
          {shouldRender && (
            <ResetButton
              INTERNAL_scope={INTERNAL_scope}
              filter={filter}
              onClick={handleReset}
            />
          )}
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

const Filters = <T extends GenericObject = GenericObject>({
  defaultValue,
  value,
  debounce = true,
  loading = false,
  showApplyButton = false,
  destroyOnClose = false,
  open,
  name,
  title,
  filters,
  form,
  onFilterValuesChange,
  onFilterValuesFinish,
  onClose,
  onFiltersReset,
  onFilterReset,
  resetAllButtonProps,
  INTERNAL_scope,

  localStorage,
  showPresets = false,
  presets,
  defaultPresets,
  onPresetEdit,
  onPresetRemove,
  onPresetSave,
  onPresetsChange,
  onPresetApply,
}: FiltersProps<T>) => {
  const t = useTranslation();
  const accessibleTitle = isUndefined(title)
    ? t(['components', 'Filters', 'title'])
    : isString(title)
      ? title
      : undefined;
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
    <Drawer.Root
      data-testid='rovna-ui-filters-drawer'
      open={open}
      destroyOnClose={destroyOnClose}
      onClose={onClose}
      aria-label={accessibleTitle}
    >
      <Root<T>
        data-testid='rovna-ui-filters-root'
        debounce={debounce}
        defaultValue={defaultValue}
        value={value}
        filters={filters}
        name={name}
        form={form}
        onFilterValuesChange={onFilterValuesChange}
        onFilterValuesFinish={onFilterValuesFinish}
        onFilterReset={onFilterReset}
        onFiltersReset={onFiltersReset}
        INTERNAL_scope={INTERNAL_scope}
        localStorage={localStorage}
        presets={presets}
        defaultPresets={defaultPresets}
        onPresetEdit={onPresetEdit}
        onPresetRemove={onPresetRemove}
        onPresetSave={onPresetSave}
        onPresetsChange={onPresetsChange}
        onPresetApply={onPresetApply}
      >
        <Drawer.Header>
          {_title}
          <Box $display='flex' $alignItems='center' $gap={8}>
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
        <Drawer.Footer>
          {showPresets && (
            <Box $flex={1}>
              <SaveButton INTERNAL_scope={INTERNAL_scope} />
            </Box>
          )}
          <ResetAllButton {...resetAllButtonProps} />
          {showApplyButton && <ApplyButton />}
        </Drawer.Footer>
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
Filters.ApplyButton = ApplyButton;

export { Filters, FilterPicker as INTERNAL_FilterPicker };
