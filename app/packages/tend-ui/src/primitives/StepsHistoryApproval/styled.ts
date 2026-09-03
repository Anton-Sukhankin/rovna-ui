import type { ComponentType } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import AntSteps from 'antd-core/es/steps';

import { colors } from '@rovna-internal/components/tokens/global';
import { Done } from '@rovna-internal/components/icons/Done';
import { Close } from '@rovna-internal/components/icons/Close';

import { ProcessStepTypes } from './types';

type StepIconProps = {
  className?: string;
  'data-status'?: string;
  size?: number | string;
  variant: string;
};

const CloseStepIconBase = Close as ComponentType<StepIconProps>;

export const Steps = styled(AntSteps)<{
  $theme: DefaultTheme;
}>`
  &.rovna-ui-steps {
    .rovna-ui-steps-item-title {
      width: 100%;
      padding-right: 0;
      .steps-created-date {
        display: flex;
        justify-content: flex-end;
      }
    }

    &.rovna-ui-steps-vertical > .rovna-ui-steps-item {
      > .rovna-ui-steps-item-container {
        > .rovna-ui-steps-item-icon {
          width: 24px;
          height: 24px;

          > .rovna-ui-steps-icon {
            display: flex;
            width: 24px;
            height: 24px;
          }
        }
        > .rovna-ui-steps-item-tail {
          inset-inline-start: 11px;
          padding: 28px 0 4px;
          &::after {
            background-color: ${props => props.$theme.colors.gray200};
          }
        }

        > .rovna-ui-steps-item-content {
          min-height: 96px;
          > .rovna-ui-steps-item-title {
            line-height: 24px;
          }
        }

        &:has(> .rovna-ui-steps-item-icon [data-status=${ProcessStepTypes.FINISH}]),
        &:has(> .rovna-ui-steps-item-icon [data-status=${ProcessStepTypes.ACTIVE}]) {
          > .rovna-ui-steps-item-content .rovna-ui-steps-item-title * {
            color: ${props => props.$theme.colors.gray900};
          }
        }
      }
    }
  }
`;

export const ActiveStepIcon = styled.div<{
  variant: string;
}>`
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  border: 4px solid #007bfb;
  background: ${colors.gray0};
  box-sizing: border-box;
`;

export const FutureStepIcon = styled.div<{
  variant: string;
}>`
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  border: 1.5px solid ${colors.gray200};
  background: ${colors.gray0};
  box-sizing: border-box;
`;

export const DoneStepIcon = styled(Done)<{
  variant: string;
}>`
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  background: ${colors.gray200};
  justify-content: center;
  color: ${colors.gray0};
  box-sizing: border-box;
`;

export const ErrorStepIcon = styled(CloseStepIconBase)<StepIconProps>`
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  background: ${colors.red600};
  justify-content: center;
  color: ${colors.gray0};
  box-sizing: border-box;
`;

export const DisabledStepIcon = styled.div<{
  variant: string;
}>`
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  border: 1.5px solid ${colors.gray200};
  background: ${colors.gray50};
  box-sizing: border-box;
`;

export const FinishedStepIcon = styled(Done).attrs({
  'data-status': ProcessStepTypes.FINISH,
})<{
  variant: string;
}>`
  width: ${props => props.variant};
  height: ${props => props.variant};
  border-radius: 100px;
  background: ${colors.green500};
  justify-content: center;
  color: ${colors.gray0};
  box-sizing: border-box;
`;
