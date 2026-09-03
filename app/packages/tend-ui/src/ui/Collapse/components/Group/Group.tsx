import React from 'react';

import { CollapseGroupProps } from '../../types';
import { GroupContext } from '../../contexts/GroupContext';

const Group: React.FC<CollapseGroupProps> = ({ children, defaultOpen }) => {
  return (
    <GroupContext.Provider value={React.useMemo(() => ({ defaultOpen }), [defaultOpen])}>
      {children}
    </GroupContext.Provider>
  );
};

Group.displayName = 'Collapse.Group';

export { Group };
