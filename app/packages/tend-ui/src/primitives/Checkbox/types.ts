import React from 'react';
import AntCheckbox from 'antd-core/es/checkbox/Checkbox';
import { CheckboxChangeEvent, CheckboxOptionType } from 'antd-core/es/checkbox';
import AntCheckboxGroup, { CheckboxValueType } from 'antd-core/es/checkbox/Group';

type AntCheckboxProps = React.ComponentPropsWithoutRef<typeof AntCheckbox>;
type AntCheckboxGroupProps = React.ComponentPropsWithoutRef<typeof AntCheckboxGroup>;
export type CheckboxProps = AntCheckboxProps & React.AriaAttributes;
export type CheckboxRef = React.ElementRef<typeof AntCheckbox>;
export type CheckboxGroupRef = React.ElementRef<typeof AntCheckboxGroup>;
export type CheckBoxGroupProps = AntCheckboxGroupProps &
  React.AriaAttributes & {
  fullWidth?: boolean;
  layout?: 'horizontal' | 'vertical';
  };

export type { CheckboxOptionType, CheckboxValueType, CheckboxChangeEvent };
