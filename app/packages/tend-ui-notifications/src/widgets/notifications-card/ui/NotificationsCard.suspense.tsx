import { Box, Divider } from '@rovna-ui/components/grid';
import { Skeleton } from '@rovna-ui/components/ui';
import React, { memo } from 'react';

export const NotificationsCardSuspense = memo(() => (
  <Box $display='flex' $flexDirection='column' $gap={4} $pl={28}>
    <Box $display='flex' $gap={12} $alignItems='center' $height={32}>
      <Skeleton width={60} height={20} />
      <Skeleton width={120} height={16} />
    </Box>
    <Box $display='flex' $flexDirection='column' $gap={8}>
      <Skeleton width={420} height={24} />
      <Skeleton width={72} height={24} />
      <Divider margin={'12px 0 0 0'} />
    </Box>
  </Box>
));
