import { createContext } from '@rovna-ui/factories';

import { CoreLayoutProps, Upload } from '@rovna-internal/upload/core/interfaces';

export const [UploadContext, useUploadContext] = createContext<Upload & CoreLayoutProps>(
  'UploadContext',
);
