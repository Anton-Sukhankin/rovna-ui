import React from 'react';

import { FallbackProps, FallbackRef } from './types';
import { useAvatarContext } from '../../contexts';
import { Root } from './styled';

const Fallback = React.forwardRef<FallbackRef, FallbackProps>(
  ({ className, ...props }, ref) => {
    const context = useAvatarContext();
    const isSuccess = context.imageLoadingStatus === 'success';
    if (isSuccess) return null;

    return (
      <Root
        data-testid='rovna-ui-avatar-fallback'
        {...props}
        ref={ref}
        className={['rovna-ui-avatar-fallback', className].filter(Boolean).join(' ')}
      />
    );
  },
);

Fallback.displayName = 'Avatar.Fallback';

export { Fallback };
