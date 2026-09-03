import styled, { css, keyframes } from 'styled-components';

const createShrinkKeyframes = (
  strokeDasharray: number,
  strokeDashoffset: number,
) => keyframes`
  0% {
    stroke-dashoffset: ${strokeDasharray};
  }

  30% {
    stroke-dashoffset: ${strokeDashoffset};
  }

  80% {
    stroke-dashoffset: ${strokeDashoffset};
  }

  100% {
    stroke-dashoffset: ${strokeDasharray};
  }
`;

export const Circle = styled.circle`
  transform: rotate(-90deg);
  transform-origin: center;
  animation: rotate 1s linear infinite,
    ${props =>
        createShrinkKeyframes(
          props.strokeDasharray as number,
          props.strokeDashoffset as number,
        )}
      1s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(-90deg);
    }

    30% {
      transform: rotate(-90deg);
    }

    60% {
      transform: rotate(90deg);
    }

    100% {
      transform: rotate(270deg);
    }
  }
`;

export const Root = styled.div<{ $color?: string }>`
  position: relative;
  color: ${props => props.$color || 'inherit'};
`;
export const Svg = styled.svg<{ $center: boolean }>`
  ${props =>
    props.$center &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}
`;
export const Children = styled.span<{ $loading: boolean }>`
  ${props =>
    props.$loading &&
    css`
      pointer-events: none;
    `}
`;
