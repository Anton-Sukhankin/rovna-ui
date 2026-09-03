import React from 'react';
import { TreeNodeProps } from 'antd-core/es';
import { INTERNAL_RovnaUILogger as RovnaUILogger } from '@rovna-ui/utils';

import { TreeProps, TreeRef } from './types';
import { ExpandButton } from './ExpandButton';
import { Root } from './styled';

/**
 * @deprecated Устарело
 * Используйте `Tree` из пакета `@rovna-ui/tree`
 */
const Tree = React.forwardRef<TreeRef, TreeProps>(
  ({ selectable = false, ...props }, ref) => {
    if (process.env.NODE_ENV === 'development') {
      RovnaUILogger.warning([
        '<Tree /> из пакета "@rovna-ui/components" устарел и больше не поддерживается.',
        '',
        'Используйте <Tree /> из пакета "@rovna-ui/tree"',
      ]);
    }

    const switcherIcon = React.useCallback(
      (props: TreeNodeProps) => <ExpandButton {...props} />,
      [],
    );

    return (
      <Root
        data-testid='rovna-ui-tree'
        {...props}
        ref={ref}
        switcherIcon={switcherIcon}
        selectable={selectable}
      />
    );
  },
);

Tree.displayName = 'Tree';

export { Tree };
