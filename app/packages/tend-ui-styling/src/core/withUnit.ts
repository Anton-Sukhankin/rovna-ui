export const withUnit = (value?: number | string) => {
  if (typeof value === 'undefined') return;
  if (typeof value === 'number') return `${value}px`;

  return value;
};
