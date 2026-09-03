export const useSize = (size: 'large' | 'medium' | 'small') => {
  return (
    {
      large: 'large',
      medium: 'middle',
      small: 'small',
    } as const
  )[size];
};
