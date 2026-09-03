import { contextFactory } from '@rovna-ui/factories';

type SizeContextType = {
  size: 'large' | 'medium' | 'small';
};

export const [SizeContext, useSizeContext] = contextFactory<SizeContextType>();
