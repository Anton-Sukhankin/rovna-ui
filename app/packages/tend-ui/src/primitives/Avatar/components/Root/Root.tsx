import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { Root as _Root } from './styled';
import { RootProps } from './types';
import { AvatarContext } from '../../contexts';
import { ImageLoadingStatus } from '../../hooks/useImageLoadingStatus';

const Root = React.forwardRef<HTMLSpanElement, RootProps>(
  (
    {
      children,
      size = 'medium',
      className,
      pointer,
      bordered,
      UNSTABLE_styling,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const [imageLoadingStatus, setImageLoadingStatus] =
      React.useState<ImageLoadingStatus>('idle');
    const isSuccess = imageLoadingStatus === 'success';
    const backgroundColor = isSuccess ? 'transparent' : theme.colors.blue100;
    // FIXME: Исправить литеральные типы
    const _borderColor = useColor(
      UNSTABLE_styling?.borderColor as string | undefined,
      theme.colors.blue100,
    );

    return (
      <AvatarContext
        value={React.useMemo(
          () => ({
            imageLoadingStatus,
            onImageLoadingStatusChange: setImageLoadingStatus,
          }),
          [imageLoadingStatus],
        )}
      >
        <_Root
          data-testid='rovna-ui-avatar-root'
          {...props}
          ref={ref}
          theme={theme}
          $size={size}
          $pointer={pointer}
          $backgroundColor={backgroundColor}
          $bordered={bordered}
          $borderColor={_borderColor}
          className={['rovna-ui-avatar-root', className].filter(Boolean).join(' ')}
        >
          {children}
        </_Root>
      </AvatarContext>
    );
  },
);

Root.displayName = 'Avatar.Root';

export { Root };
