import React, { memo } from 'react';
import { Box } from '@rovna-ui/components/grid';

import { CheckAllButton } from '@notifications/features/check-all';
import { ReadAllButton } from '@notifications/features/read-all';
import { ReadCheckedButton } from '@notifications/features/read-checked';
import { ArchiveCheckedButton } from '@notifications/features/archive-checked';
import { DeleteCheckedButton } from '@notifications/features/delete-checked';

import * as Styled from './NotificationsActions.styled';

export const NotificationsActions = memo(() => (
  <Styled.Container>
    <CheckAllButton />
    <Box $display={'flex'} $gap={8}>
      <ReadAllButton />
      <ArchiveCheckedButton />
      <ReadCheckedButton />
      <DeleteCheckedButton />
    </Box>
  </Styled.Container>
));
