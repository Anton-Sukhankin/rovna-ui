import React from 'react';
import AntForm, { FormProps as AntFormProps } from 'antd-core/es/form';
import styled from 'styled-components';

import { FormRef } from './types';

type RootProps = { $gap?: number };
export const Root = styled(AntForm)<RootProps>`
  display: flex;
  flex-direction: column;
  gap: ${props => `${props.$gap || 16}px`};
` as <T>(
  props: AntFormProps<T> &
    RootProps & {
      ref?: React.ForwardedRef<FormRef<T>>;
    },
) => React.ReactElement;
