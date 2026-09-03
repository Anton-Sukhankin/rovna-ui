import React from 'react';
import { Tag } from '@rovna-ui/components/primitives';
import { Text } from '@rovna-ui/typography';

import { INTERNAL_useStand as useStand } from '@rovna-internal/header/core/hooks';

import { StandProps } from './types';

const labels = {
  dev: 'DEV',
  stage: 'STAGE',
  prod: 'PROD',
  mr: 'MR',
  e2e: 'E2E',
} as const;
const colors = {
  dev: {
    color: 'gray0',
    bg: 'cyan600',
  },
  stage: {
    color: 'gray0',
    bg: 'cyan600',
  },
  prod: {
    color: 'gray0',
    bg: 'cyan600',
  },
  e2e: {
    color: 'gray0',
    bg: 'cyan600',
  },
  mr: {
    color: 'gray0',
    bg: 'cyan600',
  },
} as const;

const Stand = ({ stand }: StandProps) => {
  const { isProd } = useStand(stand);

  if (isProd) {
    return null;
  }

  return (
    <Tag data-testid='rovna-ui-stand' backgroundColor={colors[stand].bg}>
      <Text
        color={colors[stand].color}
        size='small'
        uppercase
        wordBreak='normal'
        fontWeight={400}
      >
        {labels[stand]}
      </Text>
    </Tag>
  );
};

export { Stand };
