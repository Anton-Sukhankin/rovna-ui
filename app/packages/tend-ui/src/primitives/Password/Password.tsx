import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { useAllowClear } from '@rovna-internal/components/hooks/useAllowClear';
import { useSize } from '@rovna-internal/components/hooks/useSize';

import { Root } from './styled';
import { PasswordProps, PasswordRef } from './types';

const Password = React.forwardRef<PasswordRef, PasswordProps>(
  ({ allowClear, clearIconTooltip, ...props }, ref) => {
    const theme = useTheme();
    const allowClearProp = useAllowClear({ allowClear, clearIconTooltip });
    const size = useSize(props.size);

    return (
      <Root
        data-testid='rovna-ui-password'
        {...props}
        ref={ref}
        $theme={theme}
        allowClear={allowClearProp}
        size={size}
      />
    );
  },
);

Password.displayName = 'Password';

export { Password };
