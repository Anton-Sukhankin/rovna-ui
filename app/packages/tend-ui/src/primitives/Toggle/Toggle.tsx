import React from 'react';
import AntSwitch from 'antd-core/es/switch';
import { Text } from '@rovna-ui/typography';

import { ToggleProps, ToggleRef } from './types';
import { Container } from './styled';
import { Group } from './Group';

const BaseToggle = React.forwardRef<ToggleRef, React.PropsWithChildren<ToggleProps>>(
  ({ children, className, style, UNSTABLE_styling, ...props }, ref) => {
    const accessibleName =
      props['aria-label'] ??
      (typeof children === 'string' || typeof children === 'number'
        ? String(children)
        : 'Переключатель');

    return (
      <Container className={className} style={style} $disabled={props.disabled}>
        <AntSwitch
          data-testid='rovna-ui-toggle'
          {...props}
          aria-label={accessibleName}
          ref={ref}
        />
        <Text disabled={props.disabled} strong={UNSTABLE_styling?.Text?.strong}>
          {children}
        </Text>
      </Container>
    );
  },
);

const Toggle = Object.assign(BaseToggle, {
  displayName: 'Toggle',
  Group,
});

export { Toggle };
