import React, { memo } from 'react';
import { Box } from '@rovna-ui/components/grid';

// TODO Suspense
export const SettingsTypeSenderSuspense = memo(() => (
  <>
    {Array(2)
      .fill('')
      .map((_, i) => (
        <Box key={`notifications-type-sender-suspense-${i.toString()}`} />
      ))}
  </>
));
