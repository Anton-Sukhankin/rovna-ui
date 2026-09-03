import styled, { DefaultTheme } from 'styled-components';
import AntCollapse from 'antd-core/es/collapse';
import { ChevronDown } from '@rovna-ui/icons/ChevronDown';

export const Root = styled(AntCollapse)<{ $theme: DefaultTheme }>`
  &.rovna-ui-collapse > .rovna-ui-collapse-item > .rovna-ui-collapse-header {
    &[aria-expanded='true'] {
      background-color: ${props => props.$theme.colors.gray50};
    }
    &:hover {
      background-color: ${props => props.$theme.colors.gray100};
    }
  }
`;
export const Title = styled.div`
  font-family: ${props => props.theme.fonts.museo};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5;
`;
export const Description = styled.div`
  font-family: ${props => props.theme.fonts.museo};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.42857;
`;
export const ArrowIcon = styled(ChevronDown)<{ $active?: boolean }>`
  transform: ${props => (props.$active ? 'rotate(0)' : 'rotate(-90deg)')};
  transition: transform 0.3s;
`;
