import { contextFactory } from '@rovna-internal/components/factories';

import { ImageLoadingStatus } from '../hooks/useImageLoadingStatus';

type AvatarContextType = {
  imageLoadingStatus: ImageLoadingStatus;
  onImageLoadingStatusChange(status: ImageLoadingStatus): void;
};

export const [AvatarContext, useAvatarContext] = contextFactory<AvatarContextType>();
