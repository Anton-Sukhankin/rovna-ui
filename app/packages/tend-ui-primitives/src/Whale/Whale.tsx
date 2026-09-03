import React from 'react';

import { WhaleProps } from './types';
import {
  EmptyLarge,
  EmptyMedium,
  EmptySmall,
  FailLarge,
  FailMedium,
  FailSmall,
  ProcessLarge,
  ProcessMedium,
  ProcessSmall,
  SuccessLarge,
  SuccessMedium,
  SuccessSmall,
} from './components';

const Whale = ({ size = 'medium', type = 'success' }: WhaleProps) => {
  const node = {
    empty: {
      large: <EmptyLarge />,
      medium: <EmptyMedium />,
      small: <EmptySmall />,
    }[size],
    fail: {
      large: <FailLarge />,
      medium: <FailMedium />,
      small: <FailSmall />,
    }[size],
    process: {
      large: <ProcessLarge />,
      medium: <ProcessMedium />,
      small: <ProcessSmall />,
    }[size],
    success: {
      large: <SuccessLarge />,
      medium: <SuccessMedium />,
      small: <SuccessSmall />,
    }[size],
  }[type];

  return node;
};

export { Whale };
