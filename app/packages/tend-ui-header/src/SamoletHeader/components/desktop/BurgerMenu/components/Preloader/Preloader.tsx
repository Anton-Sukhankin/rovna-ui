import React from 'react';
import { Box } from '@rovna-ui/grid';
import { Divider, Skeleton } from '@rovna-ui/components/ui';

export const Preloader = () => (
  <>
    <Box $display='flex' $gap={4}>
      <Skeleton width={200} height={40} />
      <Skeleton width={200} height={40} />
    </Box>
    <Divider />
    <Box $display='flex' $gap={8}>
      <Box $display='flex' $flexDirection='column' $gap={8}>
        <Box $display='flex' $flexDirection='column' $gap={4}>
          <Skeleton width={100} height={40} />
          <Skeleton width={200} height={40} />
          <Skeleton width={200} height={40} />
          <Skeleton width={200} height={40} />
        </Box>
        <Box $display='flex' $flexDirection='column' $gap={4}>
          <Skeleton width={100} height={40} />
          <Skeleton width={200} height={40} />
          <Skeleton width={200} height={40} />
          <Skeleton width={200} height={40} />
          <Skeleton width={200} height={40} />
        </Box>
      </Box>
      <Box $display='flex' $flexDirection='column' $gap={8}>
        <Box $display='flex' $flexDirection='column' $gap={4}>
          <Skeleton width={100} height={40} />
          <Skeleton width={200} height={40} />
          <Skeleton width={200} height={40} />
        </Box>
        <Box $display='flex' $flexDirection='column' $gap={4}>
          <Skeleton width={100} height={40} />
          <Skeleton width={200} height={40} />
          <Skeleton width={200} height={40} />
        </Box>
      </Box>
      <Box $display='flex' $flexDirection='column' $gap={8}>
        <Box $display='flex' $flexDirection='column' $gap={4}>
          <Skeleton width={100} height={40} />
          <Skeleton width={200} height={40} />
          <Skeleton width={200} height={40} />
          <Skeleton width={200} height={40} />
        </Box>
        <Box $display='flex' $flexDirection='column' $gap={4}>
          <Skeleton width={100} height={40} />
          <Skeleton width={200} height={40} />
          <Skeleton width={200} height={40} />
        </Box>
      </Box>
      <Box $display='flex' $flexDirection='column' $gap={8}>
        <Box $display='flex' $flexDirection='column' $gap={4}>
          <Skeleton width={100} height={40} />
          <Skeleton width={200} height={40} />
        </Box>
      </Box>
    </Box>
  </>
);
