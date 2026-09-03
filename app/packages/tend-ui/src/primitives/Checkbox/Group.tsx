import React from 'react';

import { GroupRoot } from './styled';
import { CheckBoxGroupProps, CheckboxGroupRef } from './types';

const Group = React.forwardRef<CheckboxGroupRef, CheckBoxGroupProps>(
  (
    {
      layout = 'horizontal',
      fullWidth = false,
      'aria-required': ariaRequired,
      ...props
    },
    ref,
  ) => {
    return (
      <GroupRoot
        {...props}
        role='group'
        data-required={ariaRequired || undefined}
        ref={ref}
        $layout={layout}
        $fullWidth={fullWidth}
      />
    );
  },
);

Group.displayName = 'Checkbox.Group';

export { Group };
