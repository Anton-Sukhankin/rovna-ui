import styled, { css } from 'styled-components';

const content = css`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  min-width: 0;
  min-height: 24px;
  padding: 2px 0;
  gap: 4px;
  border-radius: 4px;
  font-family: ${props => props.theme.fonts.museo};
  font-size: ${props => props.theme.fontSizes['14']};
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  white-space: nowrap;
`;

const interactive = css`
  color: ${props => props.theme.colors.blue600};
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.colors.blue700};
    text-decoration: underline;
  }

  &:active {
    color: ${props => props.theme.colors.blue800};
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.blue700};
    outline-offset: 2px;
  }
`;

export const Root = styled.nav`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
`;

export const List = styled.ol`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  list-style: none;
`;

export const Item = styled.li`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  min-width: 0;
  flex: 0 1 auto;
`;

export const ItemIcon = styled.span`
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
`;

export const ItemLabel = styled.span<{ $maxWidth: string }>`
  display: block;
  min-width: 0;
  max-width: ${props => props.$maxWidth};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Link = styled.a`
  ${content};
  ${interactive};
`;

export const NavigationButton = styled.button`
  ${content};
  ${interactive};

  margin: 0;
  border: 0;
  background: transparent;
  font: inherit;
  cursor: pointer;
`;

export const StaticItem = styled.span`
  ${content};
  color: ${props => props.theme.colors.gray650};
`;

export const CurrentItem = styled.span`
  ${content};
  color: ${props => props.theme.colors.gray900};
  font-weight: 600;
`;

export const Separator = styled.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  color: ${props => props.theme.colors.gray400};
`;

export const ExpandButton = styled.button`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex: 0 0 28px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 4px;
  color: ${props => props.theme.colors.gray650};
  background: transparent;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.gray900};
    background: ${props => props.theme.colors['gray50-transparent']};
  }

  &:active {
    background: ${props => props.theme.colors['gray100-transparent']};
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.blue700};
    outline-offset: 2px;
  }
`;
