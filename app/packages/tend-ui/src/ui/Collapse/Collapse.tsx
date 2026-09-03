import React from 'react';
import { isString } from '@rovna-ui/utils/isString';

import { Text } from '@rovna-internal/components/typography/Text';

import { Arrow, Content, Group, Header, Root } from './components';
import { CollapseProps, CollapseRef } from './types';

const BaseCollapse = React.forwardRef<CollapseRef, CollapseProps>(
  ({ open, label, children, onOpenChange, arrowPosition = 'start', ...props }, ref) => {
    const showArrowStart = arrowPosition === 'start';
    const showArrowEnd = arrowPosition === 'end';

    return (
      <Root {...props} ref={ref} open={open} onOpenChange={onOpenChange}>
        <Header>
          {showArrowStart && <Arrow />}
          {isString(label) ? <Text>{label}</Text> : label}
          {showArrowEnd && <Arrow />}
        </Header>
        <Content>{children}</Content>
      </Root>
    );
  },
);

const Collapse = Object.assign(BaseCollapse, {
  displayName: 'Collapse',
  Group,
  Root,
  Header,
  Arrow,
  Content,
});

export { Collapse };
