import { contextFactory } from '@rovna-internal/components/factories';
import { Size } from '@rovna-internal/components/types/Size';

type SizeContextType = {
  size: Size;
};

export const [SizeContext, useSizeContext] = contextFactory<SizeContextType>();
