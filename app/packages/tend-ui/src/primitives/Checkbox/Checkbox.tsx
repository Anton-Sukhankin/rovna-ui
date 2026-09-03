import React from 'react';

import { CheckboxProps, CheckboxRef } from './types';
import { Root } from './styled';
import { Group } from './Group';

const BaseCheckbox = React.forwardRef<CheckboxRef, CheckboxProps>((props, ref) => {
  const internalRef = React.useRef<CheckboxRef>(null);
  const accessibleName = props['aria-label'] ?? (props.children ? undefined : 'Флажок');

  React.useImperativeHandle(ref, () => internalRef.current as CheckboxRef);
  React.useEffect(() => {
    if (internalRef.current?.input) {
      internalRef.current.input.indeterminate = Boolean(props.indeterminate);
    }
  }, [props.indeterminate]);

  return (
    <Root
      data-testid='rovna-ui-checkbox'
      {...props}
      aria-label={accessibleName}
      ref={internalRef}
    />
  );
});

const Checkbox = Object.assign(BaseCheckbox, {
  displayName: 'Checkbox',
  Group,
});

export { Checkbox };
