import React from 'react';

import { Root } from './styled';
import { ButtonProps } from './types';

export const Button = (props: ButtonProps) => {
  return <Root {...props} />;
};
