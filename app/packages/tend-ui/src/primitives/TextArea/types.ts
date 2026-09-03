import React from 'react';
import AntTextArea from 'antd-core/es/input/TextArea';
import { MarginProperties } from '@rovna-ui/styling';

import { BaseInputProps } from '@rovna-internal/components/types/BaseInputProps';

type AntTextAreaProps = React.ComponentPropsWithoutRef<typeof AntTextArea>;
type BaseTextAreaProps = {
  fullWidth?: boolean;
};
export type TextAreaRef = React.ElementRef<typeof AntTextArea>;
export type TextAreaProps = Omit<AntTextAreaProps, 'allowClear' | 'size'> &
  BaseInputProps &
  BaseTextAreaProps &
  MarginProperties;
