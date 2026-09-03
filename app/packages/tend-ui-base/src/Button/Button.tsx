import React from 'react';

import { Root } from './styled';
import { ButtonProps, ButtonRef } from './types';

const Button = React.forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  return <Root {...props} ref={ref} />;
});

Button.displayName = 'Button';

export { Button };
