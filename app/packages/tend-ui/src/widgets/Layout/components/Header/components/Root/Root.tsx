import React from 'react';

import { Header } from '@rovna-internal/components/primitives/Layout/components/Header';

import { RootProps } from './types';

const Root: React.FC<RootProps> = props => {
  return <Header {...props} />;
};

Root.displayName = 'Layout.Header.Root';

export { Root };
