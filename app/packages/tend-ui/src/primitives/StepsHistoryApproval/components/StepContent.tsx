import React from 'react';

import { Box } from '@rovna-internal/components/grid/Box';

import { ApprovalProcessStep } from '../types';
import { ApprovalUser } from './ApprovalUser';
import { TextWithLinks } from './TextWithLinks';

type StepContentProps = {
  step: ApprovalProcessStep;
  showAvatar: boolean;
};

export const StepContent = ({ step, showAvatar }: StepContentProps) => (
  <Box>
    {step.user && <ApprovalUser step={step} showAvatar={showAvatar} />}
    {step.comment && <TextWithLinks text={step.comment} />}
  </Box>
);
