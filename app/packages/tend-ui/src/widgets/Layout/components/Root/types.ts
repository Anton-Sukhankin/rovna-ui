import React from 'react';

import { Profile } from '@rovna-internal/components/types/Profile';

export type RootProps<P extends Profile = Profile> = {
  authenticated?: boolean;
  stand?: 'stage' | 'prod';
  profile?: P;
  children?: React.ReactNode;
};
