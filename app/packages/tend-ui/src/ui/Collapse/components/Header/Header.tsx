import React from 'react';

import { Root } from './styled';
import { useCollapseContext } from '../../contexts/CollapseContext';

const Header: React.FC = ({ children }) => {
  const { onClick } = useCollapseContext();

  return (
    <Root onClick={onClick} className='rovna-ui-collapse-header'>
      {children}
    </Root>
  );
};

Header.displayName = 'Collapse.Header';

export { Header };
