import { contextFactory } from '@rovna-internal/components/factories/contextFactory';
import { Profile } from '@rovna-internal/components/types/Profile';

type LayoutContextType = {
  authenticated: boolean;
  stand: 'stage' | 'prod';
  profile?: Profile;
};

export const [LayoutContext, useLayoutContext] = contextFactory<LayoutContextType>();
