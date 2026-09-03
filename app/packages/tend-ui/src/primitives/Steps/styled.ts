import styled, { DefaultTheme } from 'styled-components';
import AntSteps from 'antd-core/es/steps';

export const Root = styled(AntSteps)<{ $theme: DefaultTheme }>`
  &.rovna-ui-steps {
    &.rovna-ui-steps-label-vertical {
      .rovna-ui-steps-item-icon {
        margin-inline-start: 0px;
      }
      .rovna-ui-steps-item-tail {
        margin-inline-start: 16px;
      }
      .rovna-ui-steps-item-content {
        width: auto;
        text-align: left;
      }
    }

    &.rovna-ui-steps-vertical
      > .rovna-ui-steps-item
      > .rovna-ui-steps-item-container
      > .rovna-ui-steps-item-tail::after {
      width: 2px;
    }

    .rovna-ui-steps-item-title,
    .rovna-ui-steps-item-icon {
      font-weight: 600;
    }
    .rovna-ui-steps-item-wait .rovna-ui-steps-item-icon {
      background-color: transparent;
      border-color: ${props => props.$theme.colors.gray150};
    }
    .rovna-ui-steps-item-wait,
    .rovna-ui-steps-item-disabled {
      .rovna-ui-steps-item-title,
      .rovna-ui-steps-item-description {
        color: ${props => props.$theme.colors.gray650} !important;
      }
    }
    .rovna-ui-steps-item-disabled .rovna-ui-steps-item-icon {
      border-color: ${props => props.$theme.colors.gray200};
      background-color: ${props => props.$theme.colors.gray50};
      .rovna-ui-steps-icon {
        color: ${props => props.$theme.colors.gray400};
      }
    }
    .rovna-ui-steps-item {
      &:not(.rovna-ui-steps-item-active) {
        /* Error step hovering */
        &.rovna-ui-steps-item-error {
          & > .rovna-ui-steps-item-container[role='button'] {
            &:hover {
              .rovna-ui-steps-item-title,
              .rovna-ui-steps-item-description {
                color: ${props => props.$theme.colors.red500};
              }
              .rovna-ui-steps-item-icon {
                background-color: ${props => props.$theme.colors.red500};
                border-color: ${props => props.$theme.colors.red500};
                .rovna-ui-steps-icon {
                  color: ${props => props.$theme.colors.gray0};
                }
              }
            }
          }
        }
        &:not(.rovna-ui-steps-item-error) {
          /* Finished step hovering */
          &:not(.rovna-ui-steps-item-process):not(.rovna-ui-steps-item-wait) {
            & > .rovna-ui-steps-item-container[role='button'] {
              &:hover .rovna-ui-steps-item-icon {
                border-color: ${props => props.$theme.colors.green500};
                .rovna-ui-steps-icon {
                  color: ${props => props.$theme.colors.gray0};
                }
              }
            }
          }
          /* Awaiting step hovering */
          &:not(.rovna-ui-steps-item-finish)
            > .rovna-ui-steps-item-container[role='button'] {
            &:hover .rovna-ui-steps-item-icon {
              background-color: ${props => props.$theme.colors.blue50};
            }
          }
        }
      }
    }

    .rovna-ui-steps-item-process,
    .rovna-ui-steps-item-wait {
      & > .rovna-ui-steps-item-container > .rovna-ui-steps-item-tail {
        &::after {
          background: linear-gradient(
            to right,
            ${props => props.$theme.colors.gray150} 4px,
            transparent 4px
          );
          background-size: 8px 1px;
        }
      }
    }

    .rovna-ui-steps-item-finish {
      & > .rovna-ui-steps-item-container > .rovna-ui-steps-item-tail {
        &::after {
          background-color: ${props => props.$theme.colors.green500};
          height: 2px;
        }
      }

      .rovna-ui-steps-item-icon {
        background-color: ${props => props.$theme.colors.green500};
        .rovna-ui-steps-icon {
          color: ${props => props.$theme.colors.gray0};
        }
      }
    }
  }
`;
