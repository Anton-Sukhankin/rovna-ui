import React from 'react';

import { ButtonProps } from '@rovna-internal/components/primitives/Button';

export type TriggerProps = ButtonProps<'button'> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.ComponentType<any>;
};
