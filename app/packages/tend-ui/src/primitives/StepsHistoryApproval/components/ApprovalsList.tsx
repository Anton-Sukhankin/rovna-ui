import React, { useCallback, useState } from 'react';

import { Box } from '@rovna-internal/components/grid/Box';

import { ApprovalUser } from './ApprovalUser';
import { ApprovalUserStep } from '../types';
import { StyledButton } from './styled';

type ApprovalsListProps = {
  list?: ApprovalUserStep[];
  showAvatar: boolean;
  maxVisibleItems?: number;
};

export const ApprovalsList = ({
  list = [],
  showAvatar,
  maxVisibleItems = 4,
}: ApprovalsListProps) => {
  const [showAll, setShowAll] = useState(false);

  const showMore = useCallback(() => {
    setShowAll(true);
  }, []);

  return (
    <Box>
      {list.slice(0, showAll ? list.length : maxVisibleItems).map(item => (
        <ApprovalUser key={item.user.id} step={item} showAvatar={showAvatar} />
      ))}

      {!showAll && list.length > maxVisibleItems && (
        <StyledButton ml={-16} variant='link' onClick={showMore}>
          Еще {list.length - maxVisibleItems}
        </StyledButton>
      )}
    </Box>
  );
};
