import { Box, Divider } from '@rovna-ui/components/grid';
import { Badge, Tooltip } from '@rovna-ui/components/primitives';
import { Text } from '@rovna-ui/components/typography';
import React, { useCallback, useMemo, useState } from 'react';

import { Notification } from '@notifications/api/types';
import { ArchiveButton } from '@notifications/features/archive';
import { CheckButton } from '@notifications/features/check';
import { ReadButton } from '@notifications/features/read';
import { formatTimestamp } from '@notifications/shared/lib/utils/formatTimestamp';

import { getUnescapedHtml } from '../lib/utils';
import * as Styled from './NotificationsCard.styled';

export const NotificationsCard = ({
  id,
  title,
  module_title,
  dt_read,
  dt_archive,
  timestamp,
  message_body,
  module_url,
  type,
}: Notification) => {
  const [read, setRead] = useState(false);
  const isRead = useMemo(() => !!dt_read || read, [dt_read, read]);

  const unescapedHtml = useMemo(() => getUnescapedHtml(message_body), [message_body]);
  const formattedTimestamp = useMemo(() => formatTimestamp(timestamp), [timestamp]);

  const handleClickService = useCallback(() => {
    window.open(module_url, '_blank');
  }, [module_url]);

  return (
    <Styled.Container>
      <Box $display='flex' $gap={12} $alignItems='center' $height={32}>
        <Box $display='flex' $alignItems='center' $justifyContent='center' $width={16}>
          <Badge preset='blue' hidden={isRead} />
        </Box>
        <Tooltip overlay='Перейти в сервис'>
          <Badge inner={module_title} preset='blue-light' onClick={handleClickService} />
        </Tooltip>
        <Text color='gray650' size='small'>
          {formattedTimestamp}
        </Text>
      </Box>
      <Box $display='grid' $gridTemplateColumns='16px 1fr' $gap={12}>
        <CheckButton id={id} />
        <Box
          $position='relative'
          $display='flex'
          $flexDirection='column'
          $gap={8}
          $alignItems='start'
        >
          <Text size='large' fontWeight={!isRead ? 600 : 500}>
            {title}
          </Text>
          {read ? (
            <div dangerouslySetInnerHTML={{ __html: unescapedHtml }} />
          ) : (
            <ReadButton id={id} onClick={() => setRead(true)} />
          )}
          <Divider margin={'12px 0 0 0'} />
        </Box>
        <ArchiveButton id={id} isArchived={!!dt_archive} type={type} />
      </Box>
    </Styled.Container>
  );
};
