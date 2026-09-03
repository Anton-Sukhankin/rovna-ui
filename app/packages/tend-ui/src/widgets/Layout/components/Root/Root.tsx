import React from 'react';

import { Root as _Root } from '@rovna-internal/components/primitives/Layout/components/Root';

import { RootProps } from './types';
import { LayoutContext } from '../../contexts';

const Root = ({ profile, authenticated = true, stand = 'prod', ...props }: RootProps) => {
  return (
    <LayoutContext
      value={React.useMemo(
        () => ({ profile, authenticated, stand }),
        [authenticated, profile, stand],
      )}
    >
      <_Root {...props} />
    </LayoutContext>
  );
};

Root.displayName = 'Layout.Root';

export { Root };
