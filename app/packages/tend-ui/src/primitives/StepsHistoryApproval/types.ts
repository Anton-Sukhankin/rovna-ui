import React from 'react';
import AntSteps, { StepProps } from 'antd-core/es/steps';

type ApprovalUser = {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  position?: string;
  email?: string;
};

type ApprovalGroup = {
  id: number;
  name: string;
  users: ApprovalUser[];
};

export type ApprovalGroupStep = {
  group: ApprovalGroup;
};

export type ApprovalUserStep = {
  user: ApprovalUser;
};

export type ApprovalProcessStep = {
  id?: string;
  title: string;
  step?: ProcessStep;
  docId?: string;
  user?: ApprovalUser;
  group?: Omit<ApprovalGroup, 'users'>;
  created?: string;
  updated?: string;
  deleted?: string | null;
  comment?: string;
};

export type ProcessStepTypeValues =
  | 'start'
  | 'middle'
  | 'finish'
  | 'cancel'
  | 'diadoc_sign'
  | 'future'
  | 'active'
  | 'disabled';

export const ProcessStepTypes = {
  START: 'start' as const,
  MIDDLE: 'middle' as const,
  FINISH: 'finish' as const,
  CANCEL: 'cancel' as const,
  DIADOC_SIGN: 'diadoc_sign' as const,
  FUTURE: 'future' as const,
  ACTIVE: 'active' as const,
  DISABLED: 'disabled' as const,
} satisfies Record<string, ProcessStepTypeValues>;

export type ProcessStepType = (typeof ProcessStepTypes)[keyof typeof ProcessStepTypes];

export type ProcessStep = {
  id?: string;
  name?: string;
  routeId?: string;
  stepType?: ProcessStepType;
};

type AntStepsProps = React.ComponentPropsWithoutRef<typeof AntSteps>;
export type Items = (StepProps & ApprovalProcessStep)[];
export type StepsHistoryApprovalProps = Omit<AntStepsProps, 'items'> & {
  items: Items;
  currentApprovalUsers?: ApprovalUserStep[];
  currentApprovalGroups?: ApprovalGroupStep[];
  currentStepTitle?: string;
  showAvatar?: boolean;
};
