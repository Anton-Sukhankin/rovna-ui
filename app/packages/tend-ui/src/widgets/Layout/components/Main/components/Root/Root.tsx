import React from 'react';

import { Main } from '@rovna-internal/components/primitives/Layout/components/Main';

import { RootProps } from './types';

const Root = (props: RootProps) => {
  return <Main {...props} />;
};

Root.displayName = 'Layout.Main.Root';

export { Root };
