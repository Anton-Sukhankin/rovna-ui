import React from 'react';

import { useLayoutContext } from '../../contexts';
import { AuthenticatedProps } from './types';

const Authenticated: React.FC<AuthenticatedProps> = ({ children, fallback = null }) => {
  const { authenticated } = useLayoutContext();

  return authenticated ? <>{children}</> : <>{fallback}</>;
};

Authenticated.displayName = 'Layout.Authenticated';

export { Authenticated };
