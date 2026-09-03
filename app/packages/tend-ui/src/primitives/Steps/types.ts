import React from 'react';
import AntSteps, { StepProps as AntStepProps } from 'antd-core/es/steps';

import { StepsHistoryApprovalProps } from '../StepsHistoryApproval';

type AntStepsProps = React.ComponentPropsWithoutRef<typeof AntSteps>;
export type StepsRef = React.ElementRef<typeof AntSteps>;
export type StepProps = AntStepProps & {
  children?: React.ReactNode;
};
export type TVariant = 'large' | 'medium' | 'small';
export type StepsProps = Omit<AntStepsProps, 'items' | 'children'> & {
  items?: StepProps[];
  variant?: TVariant;
  direction: TStepsDirection;
} & StepsHistoryApprovalProps;

export type TStepsDirection = 'vertical' | 'horizontal';
