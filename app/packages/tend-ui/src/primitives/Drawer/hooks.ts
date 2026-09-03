export const useSize = (size: 'default' | 'small' | 'medium' | 'large') => {
  return (
    {
      default: 'default',
      small: 'default',
      medium: 'default',
      large: 'large',
    } as const
  )[size];
};
