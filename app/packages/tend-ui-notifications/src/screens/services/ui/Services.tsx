import { Box, Divider } from '@rovna-ui/components/grid';
import { Text } from '@rovna-ui/components/typography';
import React from 'react';

import { ServicesDisabledAlert } from '@notifications/widgets/services-disabled';
import { ServicesList } from '@notifications/widgets/services-list';

export const Services = () => (
  <Box $display={'flex'} $flexDirection={'column'} $height={'100%'}>
    <Box $display='flex' $flexDirection='column' $gap={24} $padding={'0 24px'}>
      <ServicesDisabledAlert />
      <Box>
        <Text size={'large'} fontWeight={600}>
          Все сервисы
        </Text>
        <Divider margin={'10px 0 0'} />
      </Box>
    </Box>
    <ServicesList />
  </Box>
);
