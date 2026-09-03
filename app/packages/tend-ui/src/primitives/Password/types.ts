import React from 'react';
import AntPassword from 'antd-core/es/input/Password';

import { BaseInputProps } from '@rovna-internal/components/types/BaseInputProps';

type AntPasswordProps = React.ComponentPropsWithoutRef<typeof AntPassword>;
export type PasswordRef = React.ElementRef<typeof AntPassword>;
export type PasswordProps = Omit<AntPasswordProps, 'allowClear' | 'size'> &
  BaseInputProps;
