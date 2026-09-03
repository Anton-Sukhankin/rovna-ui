import styled from 'styled-components';

export const Root = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const Circle = styled.div<{ $size: number }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.$size}px;
  width: ${props => props.$size}px;
  border-radius: 50%;
  background: linear-gradient(44deg, #f2f7fb 12.72%, rgba(234, 237, 245, 0) 88.35%);
`;
