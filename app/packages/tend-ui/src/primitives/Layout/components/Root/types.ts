import React from 'react';

import { Size } from '@rovna-internal/components/types/Size';

export type RootProps = React.ComponentPropsWithoutRef<'div'> & {
  size?: Size;
};
