export const createMediaQuery = (
  breakpoint: number,
  property: string,
  value: number | string,
) => `
  @media (max-width: ${breakpoint}px) {
    ${property}: ${value};
  }
`;
