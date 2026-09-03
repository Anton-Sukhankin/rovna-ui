import React from 'react';
import { Box } from '@rovna-ui/grid';
import { Divider, Skeleton } from '@rovna-ui/components/ui';

interface PreloaderProps {
  variant?: 'samolet' | 'global';
}

const SamoletPreloader = () => (
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

const GlobalPreloader = () => (
  <>
    <Box $display='flex' $gap={4} $flexDirection='column'>
      <Skeleton width={200} height={44} />
      <Skeleton width={200} height={44} />
      <Skeleton width={200} height={44} />
      <Skeleton width={200} height={44} />
    </Box>
    <Divider margin='24px 0' padding='0' />
    <Box $display='flex' $gap={4} $flexDirection='column'>
      <Skeleton width={200} height={44} />
      <Skeleton width={200} height={44} />
      <Skeleton width={200} height={44} />
    </Box>
  </>
);

// Основной компонент
const Preloader = ({ variant = 'samolet' }: PreloaderProps) => {
  return variant === 'samolet' ? <SamoletPreloader /> : <GlobalPreloader />;
};

export { Preloader };
