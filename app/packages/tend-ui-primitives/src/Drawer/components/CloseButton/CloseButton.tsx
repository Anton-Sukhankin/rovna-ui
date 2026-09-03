import React from 'react';
import { Close } from '@rovna-ui/icons/Close';
import { useTheme } from '@rovna-ui/theme';

import { Tooltip } from '../../../Tooltip';
import { useDrawerContext } from '../../contexts/DrawerContext';
import { Root } from './styled';
import { CloseButtonProps } from './types';

const CloseButton = (props: React.PropsWithChildren<CloseButtonProps>) => {
  const theme = useTheme();
  const context = useDrawerContext();

  return (
    <Tooltip title='Закрыть'>
      <Root
        aria-label='Закрыть'
        onClick={context?.onClose}
        {...props}
        theme={theme}
      >
        <Close size={20} />
      </Root>
    </Tooltip>
  );
};

CloseButton.displayName = 'Drawer.CloseButton';

export { CloseButton };
