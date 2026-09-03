import React from 'react';
import { Group } from '@rovna-ui/icons/Group';

import { ToggleButton } from '@rovna-internal/components/primitives/ToggleButton';

import { GroupButtonProps } from './types';

const GroupButton = (props: GroupButtonProps) => {
  return (
    <ToggleButton {...props}>
      <Group />
    </ToggleButton>
  );
};

export { GroupButton };
