import React from 'react';
import { Text } from '@rovna-ui/typography';
import { Box } from '@rovna-ui/grid/Box';

import { Tooltip } from '@rovna-internal/components/primitives/Tooltip';

import { ProcessStepType } from '../types';

type StepTitleProps = {
  title: string;
  subTitle?: React.ReactNode;
  created?: string;
  stepType?: ProcessStepType;
};

export const StepTitle = ({ title, subTitle, created, stepType }: StepTitleProps) => (
  <Box $display='flex' $justifyContent='space-between' $alignItems='center' $mb={8}>
    <Box $display='flex' $flexDirection='column'>
      <Tooltip title={title}>
        <Text ellipsis color={stepType === 'cancel' ? 'gray900' : 'gray650'} size='large'>
          {title}
        </Text>
      </Tooltip>
      {subTitle && (
        <Text ellipsis color='gray400' size='small'>
          {subTitle}
        </Text>
      )}
    </Box>
    <Box $minWidth={130}>
      <Text color='gray400' className='steps-created-date'>
        {created}
      </Text>
    </Box>
  </Box>
);
