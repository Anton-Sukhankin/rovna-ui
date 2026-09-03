import React from 'react';
import AntSpace from 'antd-core/es/space';

import { SpaceProps, SpaceRef } from './types';
import { Root } from './styled';

AntSpace.Compact.displayName = 'Space.Compact';

const InnerSpace = React.forwardRef<SpaceRef, SpaceProps>(
  ({ grow, fullWidth, ...props }, ref) => (
    <Root
      data-testid='rovna-ui-space'
      {...props}
      ref={ref}
      $grow={grow}
      $fullWidth={fullWidth}
    />
  ),
);

export const Space = Object.assign(InnerSpace, {
  displayName: 'Space',
  Compact: AntSpace.Compact,
});
