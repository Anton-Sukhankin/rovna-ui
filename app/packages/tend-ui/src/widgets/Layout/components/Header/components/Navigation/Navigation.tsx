import React from 'react';

import { NavigationProps } from './types';
import { Root } from './styled';

const Navigation = (props: NavigationProps) => {
  return <Root {...props} />;
};

Navigation.displayName = 'Layout.Header.Navigation';

export { Navigation };
