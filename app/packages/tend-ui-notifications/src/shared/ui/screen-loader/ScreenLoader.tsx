import { Box } from '@rovna-ui/components/grid';
import { Spinner } from '@rovna-ui/primitives';
import { colors } from '@rovna-ui/tokens/samolet';
import React from 'react';

export const ScreenLoader = () => {
  return (
    <Box
      $display={'flex'}
      $justifyContent={'center'}
      $alignItems={'center'}
      $height={'100%'}
    >
      <Spinner size={'small'} color={colors.blue600} />
    </Box>
  );
};
