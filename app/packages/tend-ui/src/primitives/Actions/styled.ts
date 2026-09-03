import styled, { css } from 'styled-components';

export const Root = styled.div<{ $visible: boolean; $offset?: number }>`
  position: fixed;
  z-index: 999;
  width: 640px;
  max-width: 640px;
  left: 50%;
  transform: translateX(-50%);
  transition: bottom 0.2s;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border-radius: 16px;
  background-color: ${props => props.theme.colors.gray0};
  box-shadow: 0px 14px 64px -4px rgba(24, 39, 75, 0.06),
    0px 8px 22px -6px rgba(24, 39, 75, 0.06);

  ${props => {
    const bottom = props.$offset ?? 48;

    if (props.$visible)
      return css`
        bottom: ${bottom}px;
      `;

    return css`
      bottom: -300px;
    `;
  }}
`;

export const Extra = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  flex-wrap: wrap;
`;
