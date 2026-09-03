import React from 'react';
import { Spinner } from '@rovna-ui/primitives';
import { colors } from '@rovna-ui/tokens/samolet';
import { Button } from '@rovna-ui/components/primitives';
import { ChevronUp } from '@rovna-ui/icons';
import { Box } from '@rovna-ui/grid';

import { useMessagesHistory } from './hooks';

type MessageHistoryLoaderProps = {
  scrollableContainerRef: React.RefObject<HTMLDivElement>;
};

export const MessageHistoryLoader = ({
  scrollableContainerRef,
}: MessageHistoryLoaderProps) => {
  const { fetchPrevDayMessagesHandler, historyFetching, hasPreviousDay, showHistory } =
    useMessagesHistory(scrollableContainerRef);

  return (
    <Box $display={'flex'} $justifyContent={'center'}>
      {historyFetching ? (
        <Spinner style={{ maxHeight: '32px' }} color={colors.blue600} size='small' />
      ) : (
        hasPreviousDay && (
          <Button
            style={{ fontWeight: 600 }}
            variant='link'
            onClick={fetchPrevDayMessagesHandler}
          >
            Показать {showHistory ? 'еще' : 'историю запросов'} <ChevronUp size={16} />
          </Button>
        )
      )}
    </Box>
  );
};
