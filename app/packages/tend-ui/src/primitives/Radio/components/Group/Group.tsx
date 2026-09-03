import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { Root } from './styled';
import { RadioGroupProps, RadioGroupRef } from './types';

const BaseGroup = (
  {
    layout = 'horizontal',
    fullWidth = false,
    'aria-required': ariaRequired,
    ...props
  }: RadioGroupProps,
  ref: React.ForwardedRef<RadioGroupRef>,
) => {
  const theme = useTheme();

  return (
    <Root
      {...props}
      role='radiogroup'
      aria-required={ariaRequired}
      ref={ref}
      $theme={theme}
      $layout={layout}
      $fullWidth={fullWidth}
    />
  );
};

const Group = React.forwardRef<RadioGroupRef, RadioGroupProps>(BaseGroup);

Group.displayName = 'Radio.Group';

export { Group };
