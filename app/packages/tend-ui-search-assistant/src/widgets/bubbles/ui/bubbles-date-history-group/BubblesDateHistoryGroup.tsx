import { Box } from '@rovna-ui/components/grid';
import React, { FC } from 'react';

import type { MessageTransaction } from '@search-assistant/entities/message/api/types';
import { DateSeparator } from '@search-assistant/entities/message/ui/date-separator';
import { BubbleTransactionGroup } from '@search-assistant/widgets/bubbles/ui/BubblesTransactionGroup';

type BubblesHistoryGroupProps = {
  date: string;
  transactions: Array<MessageTransaction>;
};

export const BubblesDateHistoryGroup: FC<BubblesHistoryGroupProps> = ({
  date,
  transactions,
}) => {
  return (
    <Box $display={'flex'} $flexDirection={'column'} data-date={date}>
      <DateSeparator date={date} />
      <Box $display={'flex'} $flexDirection={'column'} $gap={16}>
        {transactions.map(transaction => (
          <BubbleTransactionGroup
            key={`bubbles-group-${date}-${transaction.id}`}
            transaction={transaction}
          />
        ))}
      </Box>
    </Box>
  );
};
