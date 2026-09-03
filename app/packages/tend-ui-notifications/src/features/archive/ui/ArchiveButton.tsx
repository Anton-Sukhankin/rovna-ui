import { MoveToInbox, Outbox } from '@rovna-ui/components/icons';
import { Button, Toast, Tooltip } from '@rovna-ui/components/primitives';
import React, { useCallback, useMemo } from 'react';

import { useArchiveMutation, useUnarchiveMutation } from '@notifications/api/hooks';
import type { NotificationType } from '@notifications/api/types';

import { confirmationMessage, tooltipOverlay } from '../lib/utils';
import * as Styled from './ArchiveButton.styled';

type ArchiveButtonProps = {
  id: number;
  type: NotificationType;
  isArchived: boolean;
};

export const ArchiveButton = ({ id, type, isArchived }: ArchiveButtonProps) => {
  const { performArchive, isArchiving } = useArchiveMutation();
  const { performUnarchive, isUnarchiving } = useUnarchiveMutation();

  const handleClick = useCallback(() => {
    const fn = isArchived ? performUnarchive : performArchive;
    fn([id], {
      onSuccess: () => {
        Toast.success({
          message: confirmationMessage(isArchived, type),
        });
      },
    });
  }, [id, isArchived, type, performUnarchive, performArchive]);

  const BeforeIcon = useMemo(() => (isArchived ? Outbox : MoveToInbox), [isArchived]);

  return (
    <Styled.Wrapper id='notification-archive-btn'>
      <Tooltip overlay={tooltipOverlay(isArchived)} placement='left'>
        <Button
          size='small'
          before={<BeforeIcon />}
          variant='secondary'
          onClick={handleClick}
          loading={isArchiving || isUnarchiving}
        />
      </Tooltip>
    </Styled.Wrapper>
  );
};
