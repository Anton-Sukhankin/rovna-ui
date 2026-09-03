import React, { useMemo } from 'react';

import { ApprovalGroupStep } from '../types';
import { ApprovalUser } from './ApprovalUser';
import { declOfNum, src } from '../utils';

type GroupLabelProps = {
  group: ApprovalGroupStep['group'];
  showAvatar: boolean;
};

export const GroupLabel = ({ group, showAvatar }: GroupLabelProps) => {
  const step = useMemo(
    () => ({
      user: {
        username: group.name,
        position: `${group.users?.length ?? 0} ${declOfNum(group.users?.length ?? 0, [
          'сотрудник',
          'сотрудника',
          'сотрудников',
        ])}`,
        id: group.id,
      },
    }),
    [group.id, group.name, group.users?.length],
  );

  return <ApprovalUser src={src} step={step} showAvatar={showAvatar} />;
};
