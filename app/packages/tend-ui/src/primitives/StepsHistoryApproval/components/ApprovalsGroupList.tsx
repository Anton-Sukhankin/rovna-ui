import React from 'react';

import { Box } from '@rovna-internal/components/grid/Box';
import { Collapse } from '@rovna-internal/components/ui/Collapse';

import { ApprovalUser } from './ApprovalUser';
import { ApprovalGroupStep } from '../types';
import { GroupLabel } from './GroupLabel';

type ApprovalsGroupListProps = {
  list?: ApprovalGroupStep[];
  showAvatar: boolean;
};

export const ApprovalsGroupList = ({ list, showAvatar }: ApprovalsGroupListProps) => {
  return (
    <>
      {list?.map(item => (
        <Box key={item.group.id}>
          <Collapse
            arrowPosition='end'
            label={<GroupLabel group={item.group} showAvatar={showAvatar} />}
          >
            {item.group.users.map(user => (
              <Box $ml={16} key={user.id}>
                <ApprovalUser step={{ user }} showAvatar={showAvatar} />
              </Box>
            ))}
          </Collapse>
        </Box>
      ))}
    </>
  );
};
