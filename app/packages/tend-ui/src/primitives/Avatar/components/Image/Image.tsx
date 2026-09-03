import React from 'react';

import { useCallbackRef } from '@rovna-internal/components/hooks/useCallbackRef';

import { Root } from './styled';
import { ImageProps } from './types';
import { useImageLoadingStatus } from '../../hooks/';
import { useAvatarContext } from '../../contexts';
import { ImageLoadingStatus } from '../../hooks/useImageLoadingStatus';

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ children, src, className, fit = 'cover', ...props }, ref) => {
    const _src = Array.isArray(src) ? undefined : src;
    const imageLoadingStatus = useImageLoadingStatus(_src);
    const context = useAvatarContext();
    const isSuccess = context.imageLoadingStatus === 'success';
    const onLoadingStatusChange = useCallbackRef((status: ImageLoadingStatus) => {
      context.onImageLoadingStatusChange(status);
    });

    React.useLayoutEffect(() => {
      if (imageLoadingStatus === 'idle') return;
      onLoadingStatusChange(imageLoadingStatus);
    }, [imageLoadingStatus, onLoadingStatusChange]);

    if (!isSuccess) return null;

    return (
      <Root
        data-testid='rovna-ui-avatar-image'
        {...props}
        ref={ref}
        $objectFit={fit}
        src={_src}
        className={['rovna-ui-avatar-image', className].filter(Boolean).join(' ')}
      >
        {children}
      </Root>
    );
  },
);

Image.displayName = 'Avatar.Image';

export { Image };
