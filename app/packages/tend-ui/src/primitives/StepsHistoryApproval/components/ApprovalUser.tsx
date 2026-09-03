import React from 'react';
import { Text } from '@rovna-ui/typography';
import { isString } from '@rovna-ui/utils/isString';

import { Tooltip } from '@rovna-internal/components/primitives/Tooltip';
import { Box } from '@rovna-internal/components/grid/Box';
import { Avatar } from '@rovna-internal/components/primitives/Avatar';
import { useTheme } from '@rovna-internal/components/theme/Theme';

import { ApprovalProcessStep, ApprovalUserStep } from '../types';
import { UsersGroup } from './UsersGroup';
import { ApprovalUserContainer, CustomAvatar } from './styled';
import { CopyEmail } from './CopyEmail';

type ApprovalUserProps = {
  step: ApprovalProcessStep | ApprovalUserStep;
  src?: string | string[];
  showAvatar?: boolean;
};

export const ApprovalUser = ({ step, src, showAvatar }: ApprovalUserProps) => {
  const theme = useTheme();

  const group = 'group' in step ? step.group : undefined;

  const fullName = `${isString(step?.user?.firstName) ? step.user.firstName[0] : ''}${
    isString(step?.user?.lastName) ? step.user.lastName[0] : ''
  }`;
  const name = fullName || undefined;

  return (
    <ApprovalUserContainer
      $display='flex'
      $alignItems='center'
      $gap={16}
      $mb={8}
      className='approval-user-container'
    >
      {showAvatar && (
        <Box $position='relative'>
          <Tooltip title={step.user?.username}>
            <Avatar pointer src={src}>
              {name ?? undefined}
            </Avatar>
          </Tooltip>
          {group?.name && (
            <Tooltip title={group.name}>
              <CustomAvatar $theme={theme} $position='absolute'>
                <UsersGroup />
              </CustomAvatar>
            </Tooltip>
          )}
        </Box>
      )}
      <Box $display='flex' $flexDirection='column'>
        {step.user?.username && (
          <Box $display='flex' $alignItems='center'>
            <Text color='gray900' mr={4} fontWeight={600}>
              {step.user.username}
            </Text>
            {!showAvatar && group?.name && (
              <Tooltip title={group?.name}>
                <CustomAvatar $theme={theme} $position='static'>
                  <UsersGroup />
                </CustomAvatar>
              </Tooltip>
            )}
          </Box>
        )}
        {step.user?.position && <Text color='gray400'>{step.user.position}</Text>}
        {step.user?.email && <CopyEmail email={step.user.email} />}
      </Box>
    </ApprovalUserContainer>
  );
};
