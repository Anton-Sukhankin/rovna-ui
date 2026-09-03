import { Box } from '@rovna-ui/components/grid';
import { Text } from '@rovna-ui/components/typography';
import React, { memo } from 'react';

export const NotificationsEmpty = memo(() => (
  <Box
    $display='flex'
    $flex={1}
    $alignItems='center'
    $justifyContent='center'
    $flexDirection='column'
  >
    <Text>У вас пока нет уведомлений</Text>
  </Box>
));
