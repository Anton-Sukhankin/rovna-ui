import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Cancel } from '@rovna-ui/icons/Cancel';

import { Box } from '@rovna-internal/components/grid/Box';
import { Paragraph } from '@rovna-internal/components/typography/Paragraph';

export const ErrorOverlay = () => {
  const t = useTranslation();

  return (
    <Box
      $display='flex'
      $alignItems='center'
      $justifyContent='center'
      $flexDirection='column'
      $gap={4}
      $height='68px'
    >
      <Cancel color='red600' size={20} />
      <Paragraph margin='0' color='red600'>
        {t(['general', 'error'])}
      </Paragraph>
    </Box>
  );
};
