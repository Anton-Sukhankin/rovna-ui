import { Size } from '@rovna-internal/components/types';

/**
 * @description Size-adapter-hook for backward compatibility for Antd sizes and RovnaUI sizes
 */
export const useSize = (size?: Size) => {
  if (!size) return;

  return (
    {
      large: 'large',
      medium: 'middle',
      small: 'small',
    } as const
  )[size];
};
