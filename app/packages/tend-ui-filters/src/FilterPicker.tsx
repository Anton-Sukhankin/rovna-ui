import React from 'react';
import omit from 'lodash/omit';

import { AsyncCheckboxFilter } from './core/components/AsyncCheckboxFilter';
import { AsyncRadioFilter } from './core/components/AsyncRadioFilter';
import { AsyncSelectFilter } from './core/components/AsyncSelectFilter';
import { CheckboxFilter } from './core/components/CheckboxFilter';
import { CheckboxGroupFilter } from './core/components/CheckboxGroupFilter';
import { DatePickerFilter } from './core/components/DatePickerFilter';
import { InputFilter } from './core/components/InputFilter';
import { RadioFilter } from './core/components/RadioFilter';
import { RadioGroupFilter } from './core/components/RadioGroupFilter';
import { RangePickerFilter } from './core/components/RangePickerFilter';
import { ToggleFilter } from './core/components/ToggleFilter';
import { SelectFilter } from './core/components/SelectFilter';
import { CheckboxGroupSearchFilter } from './core/components/CheckboxGroupSearchFilter';
import { RadioGroupSearchFilter } from './core/components/RadioGroupSearchFilter';
import { InputNumberFilter } from './core/components/InputNumberFilter';
import { FilterComponent, FilterConfig } from './core/types';
import { RangeInputFilter } from './core/components/RangeInputFilter';

type FilterPickerProps = FilterComponent & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};

export const INTERNAL_FilterPicker = React.memo<FilterPickerProps>(props => {
  const accessibleProps = {
    ...props,
    'aria-label':
      ('aria-label' in props && props['aria-label']) ||
      (typeof props.config.label === 'string' ? props.config.label : undefined),
  } as FilterPickerProps;

  switch (accessibleProps.component) {
    case 'input':
      return <InputFilter {...omit(accessibleProps, 'component')} />;
    case 'input-number':
      return <InputNumberFilter {...omit(accessibleProps, 'component')} />;
    case 'select':
      return <SelectFilter {...omit(accessibleProps, 'component')} />;
    case 'async-select':
      return <AsyncSelectFilter {...omit(accessibleProps, 'component')} />;
    case 'async-checkbox':
      return <AsyncCheckboxFilter {...omit(accessibleProps, 'component')} />;
    case 'async-radio':
      return <AsyncRadioFilter {...omit(accessibleProps, 'component')} />;
    case 'toggle':
      return <ToggleFilter {...omit(accessibleProps, 'component')} />;
    case 'checkbox':
      return <CheckboxFilter {...omit(accessibleProps, 'component')} />;
    case 'checkbox-group':
      return <CheckboxGroupFilter {...omit(accessibleProps, 'component')} />;
    case 'checkbox-group-search':
      return <CheckboxGroupSearchFilter {...omit(accessibleProps, 'component')} />;
    case 'radio':
      return <RadioFilter {...omit(accessibleProps, 'component')} />;
    case 'radio-group':
      return <RadioGroupFilter {...omit(accessibleProps, 'component')} />;
    case 'radio-group-search':
      return <RadioGroupSearchFilter {...omit(accessibleProps, 'component')} />;
    case 'date-picker':
      return <DatePickerFilter {...omit(accessibleProps, 'component')} />;
    case 'range-picker':
      return <RangePickerFilter {...omit(accessibleProps, 'component')} />;
    case 'range-input':
      return <RangeInputFilter {...omit(accessibleProps, 'component')} />;
    default:
      return <span>Filter is not supported</span>;
  }
});
