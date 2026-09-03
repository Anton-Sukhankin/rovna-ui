import React from 'react';

import { Spinner } from '@rovna-internal/primitives/Spinner';
import { EmptySize } from '@rovna-internal/primitives/Empty/types';

export const Loading = ({ size }: { size: EmptySize }) => {
  return <Spinner color='blue600' size={size} />;
};
