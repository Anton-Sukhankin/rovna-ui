import React, { memo } from 'react';
import { Box } from '@rovna-ui/components/grid';

// TODO Suspense
export const SettingsTypeEntriesSuspense = memo(() => (
  <>
    {Array(2)
      .fill('')
      .map((_, i) => (
        <Box key={`notifications-type-entries-suspense-${i.toString()}`} />
      ))}
  </>
));
