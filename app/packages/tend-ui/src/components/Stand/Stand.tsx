import React from 'react';

import { Tag } from '@rovna-internal/components/primitives/Tag';
import { Text } from '@rovna-internal/components/typography/Text';

import { StandProps } from './types';

const labels = {
  dev: 'DEV',
  stage: 'STAGE',
  prod: 'PROD',
} as const;
const colors = {
  dev: {
    color: 'red700',
    bg: 'red200',
  },
  stage: {
    color: 'gold700',
    bg: 'gold200',
  },
  prod: {
    color: 'cyan700',
    bg: 'cyan200',
  },
} as const;

const Stand = ({ stand }: StandProps) => {
  return (
    <Tag
      data-testid='rovna-ui-stand'
      padding='0 4px'
      backgroundColor={colors[stand].bg}
      borderRadius={4}
    >
      <Text
        color={colors[stand].color}
        size='xs'
        uppercase
        wordBreak='normal'
        fontWeight={600}
      >
        {labels[stand]}
      </Text>
    </Tag>
  );
};

Stand.displayName = 'Stand';

export { Stand };
