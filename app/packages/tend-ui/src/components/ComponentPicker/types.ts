import { InputProps } from '@rovna-internal/components/primitives/Input';
import { CheckBoxGroupProps, CheckboxProps } from '@rovna-internal/components/primitives/Checkbox';
import { DatePickerProps } from '@rovna-internal/components/primitives/DatePicker';
import { RangePickerProps } from '@rovna-internal/components/primitives/RangePicker';
import { ToggleProps } from '@rovna-internal/components/primitives/Toggle';
import { RadioGroupProps, RadioProps } from '@rovna-internal/components/primitives/Radio';
import { SelectProps } from '@rovna-internal/components/primitives/Select';
import { AsyncSelectProps } from '@rovna-internal/components/components/AsyncSelect';

type InputComponent = InputProps & {
  component: 'input';
};
type SelectComponent = SelectProps<unknown> & {
  component: 'select';
};
type AsyncSelectComponent = AsyncSelectProps & {
  component: 'async-select';
};
type CheckboxComponent = CheckboxProps & {
  component: 'checkbox';
};
type CheckboxGroupComponent = CheckBoxGroupProps & {
  component: 'checkbox-group';
};
type RadioComponent = RadioProps & {
  component: 'radio';
};
type RadioGroupComponent = RadioGroupProps & {
  component: 'radio-group';
};
type DatePickerComponent = DatePickerProps & {
  component: 'date-picker';
};
type RangePickerComponent = RangePickerProps & {
  component: 'range-picker';
};
type ToggleComponent = ToggleProps & {
  component: 'toggle';
};

export type ComponentPickerProps =
  | InputComponent
  | SelectComponent
  | AsyncSelectComponent
  | CheckboxComponent
  | CheckboxGroupComponent
  | DatePickerComponent
  | ToggleComponent
  | RangePickerComponent
  | RadioComponent
  | RadioGroupComponent;
