import React, { useCallback } from 'react';
import { Text } from '@rovna-ui/typography';
import message from 'antd-core/lib/message';

import { Tooltip } from '@rovna-internal/components/primitives/Tooltip';
import { useTheme } from '@rovna-internal/components/theme/Theme';
import { Copy } from '@rovna-internal/components/icons/Copy';

import { CopyContainer } from './styled';

type CopyEmailProps = {
  email: string;
};

export const CopyEmail = ({ email }: CopyEmailProps) => {
  const theme = useTheme();

  const handleCopyClick = useCallback(() => {
    navigator.clipboard.writeText(email).then(() => message.success('Скопировано'));
  }, [email]);

  return (
    <CopyContainer theme={theme} $display='flex' $alignItems='center' $gap={4}>
      <Text color='gray400'>{email}</Text>
      <Tooltip title='Скопировать'>
        <Copy onClick={handleCopyClick} />
      </Tooltip>
    </CopyContainer>
  );
};
