import React from 'react';
import { ChevronDown } from '@rovna-ui/icons/ChevronDown';
import { ChevronRight } from '@rovna-ui/icons/ChevronRight';

import { useCollapseContext } from '@rovna-internal/components/ui/Collapse/contexts/CollapseContext';

const Arrow = () => {
  const { open } = useCollapseContext();

  return open ? (
    <ChevronDown size={20} color='gray500' />
  ) : (
    <ChevronRight size={20} color='gray500' />
  );
};

Arrow.displayName = 'Collapse.Arrow';

export { Arrow };
