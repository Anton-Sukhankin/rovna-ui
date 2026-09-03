import styled, { DefaultTheme } from 'styled-components';
import AntSteps from 'antd-core/es/steps';

import { colors } from '@rovna-internal/components/tokens/global';

import { ProcessStepTypes } from '../StepsHistoryApproval/types';
import { TStepsDirection } from './types';

export const Steps = styled(AntSteps)<{
  $theme: DefaultTheme;
  direction: TStepsDirection;
  variant: string;
}>`
  ${props => {
    const iconStyles = `
      width: ${props.variant};
      height: ${props.variant};
      
      .rovna-ui-steps-icon {
        display: flex;
        width: ${props.variant};
        height: ${props.variant};
      }
    `;

    const hoverStyles = `
      &:hover {
        .rovna-ui-steps-item-content {
          .rovna-ui-steps-item-title * {
            color: ${props.$theme.colors.blue700};
          }
          .rovna-ui-steps-item-description * {
            color: ${props.$theme.colors.blue700};
          }
        }
        
        .rovna-ui-steps-item-icon [data-status='done'] {
          background: ${props.$theme.colors.gray400};
        }
        
        .rovna-ui-steps-item-icon [data-status='error'] {
          background: ${props.$theme.colors.red700};
        }
        
        .rovna-ui-steps-item-icon [data-status=${ProcessStepTypes.FUTURE}] {
          border: 1.5px solid ${colors.gray400};
        }
        
        &:has(> .rovna-ui-steps-item-container > .rovna-ui-steps-item-icon [data-status='error']) {
          .rovna-ui-steps-item-content .rovna-ui-steps-item-title * {
            color: ${props.$theme.colors.red700};
          }
        }
        
        &:has(> .rovna-ui-steps-item-container > .rovna-ui-steps-item-icon [data-status=${ProcessStepTypes.ACTIVE}]) {
          color: ${props.$theme.colors.gray900};
          .rovna-ui-steps-item-description * {
            color: ${props.$theme.colors.gray400};
          }
        }
        
        &:has(> .rovna-ui-steps-item-container > .rovna-ui-steps-item-icon [data-status=${ProcessStepTypes.DISABLED}]) {
          .rovna-ui-steps-item-content {
            .rovna-ui-steps-item-description * {
              color: ${props.$theme.colors.gray500};
            }
            .rovna-ui-steps-item-title * {
              color: ${props.$theme.colors.gray650};
            }
          }
        }
      }
    `;

    const verticalStyles = `
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
              ${iconStyles}
              position: relative;
              z-index: 2;
            }
            
            > .rovna-ui-steps-item-tail {
              inset-inline-start: calc(${props.variant} / 2);
              padding: 28px 0 4px;
              &::after {
                content: '';
                position: absolute;
                top: calc(${props.variant} + 6px);
                height: calc(100% - 10px - ${props.variant});
                background-color: ${props.$theme.colors.gray200};
                z-index: 1;
              }
            }

            > .rovna-ui-steps-item-content {
              min-height: 64px;
              > .rovna-ui-steps-item-title {
                line-height: ${props.variant};
              }
            }

            &:has(> .rovna-ui-steps-item-icon [data-status=${ProcessStepTypes.FINISH}]),
            &:has(> .rovna-ui-steps-item-icon [data-status=${ProcessStepTypes.ACTIVE}]) {
              > .rovna-ui-steps-item-content .rovna-ui-steps-item-title * {
                color: ${props.$theme.colors.gray900};
              }
            }
            
            ${hoverStyles}
          }
        }
      }
    `;

    const horizontalStyles = `
      &.rovna-ui-steps {
        &.rovna-ui-steps-label-horizontal {
          .rovna-ui-steps-item {
            overflow: visible;
            flex: 1;
            position: relative;
            padding-bottom: 8px;
            
            &:not(:last-child)::after {
              content: '';
              position: absolute;
              top: calc(${props.variant} / 2);
              left: calc(${props.variant} + 20px);
              right: -12px;
              height: 1px;
              background-color: ${props.$theme.colors.gray200};
              z-index: 1;
            }
            
            &:first-child::after {
              left: calc(${props.variant} + 4px);
            }
            
            .rovna-ui-steps-item-container {
              display: flex;
              flex-direction: column;
              
              .rovna-ui-steps-item-icon {
                ${iconStyles}
                margin-bottom: 8px;
                position: relative;
                z-index: 2;
                margin-left: 0;
              }
              
              .rovna-ui-steps-item-content {
                .rovna-ui-steps-item-title {
                  line-height: ${props.variant};
                  white-space: nowrap;
                  &::after {
                    display: none;
                  }
                }
              }
            }
            
            &:has(> .rovna-ui-steps-item-container > .rovna-ui-steps-item-icon [data-status=${ProcessStepTypes.FINISH}]),
            &:has(> .rovna-ui-steps-item-container > .rovna-ui-steps-item-icon [data-status=${ProcessStepTypes.ACTIVE}]) {
              .rovna-ui-steps-item-content .rovna-ui-steps-item-title * {
                color: ${props.$theme.colors.gray900};
              }
            }
            
            ${hoverStyles}
          }
        }
      }
    `;

    const directionStyles: Record<TStepsDirection, string> = {
      vertical: verticalStyles,
      horizontal: horizontalStyles,
    };

    return directionStyles[props.direction];
  }}
`;
