import React from 'react';

import { Root } from './styled';
import { GroupProps } from './types';

const Group: React.FC<GroupProps> = ({ layout = 'horizontal', children, className }) => {
  return (
    <Root
      $layout={layout}
      className={['rovna-ui-toggle-group', className].filter(Boolean).join(' ')}
    >
      {children}
    </Root>
  );
};

Group.displayName = 'Toggle.Group';

export { Group };
