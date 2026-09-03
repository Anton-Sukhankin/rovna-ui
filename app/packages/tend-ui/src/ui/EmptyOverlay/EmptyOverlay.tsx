import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Search } from '@rovna-ui/icons/Search';

import { Box } from '@rovna-internal/components/grid/Box';
import { Paragraph } from '@rovna-internal/components/typography/Paragraph';

export const EmptyOverlay = () => {
  const t = useTranslation();

  return (
    <Box
      $display='flex'
      $alignItems='center'
      $justifyContent='center'
      $gap={8}
      $height='68px'
    >
      <Search color='gray500' size={20} />
      <Paragraph margin='0' color='gray500'>
        {t(['general', 'empty'])}
      </Paragraph>
    </Box>
  );
};
