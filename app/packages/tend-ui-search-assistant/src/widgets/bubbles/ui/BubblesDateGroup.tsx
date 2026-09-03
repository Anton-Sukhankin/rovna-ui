import { Box } from '@rovna-ui/components/grid';
import React from 'react';

import type { BubblesGroupType } from '@search-assistant/entities/message/lib/types';
import { DateSeparator } from '@search-assistant/entities/message/ui/date-separator';

import { BubblesGroup } from './BubblesGroup';

type BubblesDateGroupProps = {
  date: string;
  groups: Array<BubblesGroupType>;
};

export const BubblesDateGroup = ({ date, groups }: BubblesDateGroupProps) => (
  <Box $display={'flex'} $flexDirection={'column'} data-date={date}>
    <DateSeparator date={date} />
    <Box $display={'flex'} $flexDirection={'column'} $gap={16}>
      {groups.map(({ messages, sender, timestamp }) => (
        <BubblesGroup
          key={`bubbles-group-${date}-${sender}-${timestamp}`}
          sender={sender}
          messages={messages}
        />
      ))}
    </Box>
  </Box>
);
