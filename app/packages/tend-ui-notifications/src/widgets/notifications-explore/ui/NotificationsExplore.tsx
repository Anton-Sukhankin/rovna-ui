import { Box } from '@rovna-ui/components/grid';
import React, { memo } from 'react';

import { SearchInput } from '@notifications/features/search';
import { SetScreenButton } from '@notifications/features/set-screen';

export const NotificationsExplore = memo(() => (
  <Box $display='grid' $gridTemplateColumns='1fr auto auto' $gap={8}>
    <SearchInput />
    <SetScreenButton nextScreen='filters' />
    <SetScreenButton nextScreen='services' />
  </Box>
));
