import React from 'react';
import styled from 'styled-components';
import { Pin as PinIcon } from '@rovna-ui/icons/Pin';

import { PinProps } from './types';

const Root = styled(PinIcon)<{ $disabled?: boolean }>`
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
`;

export const Pin = ({ disabled, pinned, onClick, onChange }: PinProps) => {
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      if (disabled) return;

      onClick?.(e);

      if (pinned) {
        onChange?.('none');

        return;
      }

      onChange?.('left');
    },
    [disabled, onChange, onClick, pinned],
  );

  const colors = [
    [disabled, 'gray500'],
    [pinned, 'blue600'],
    [true, 'gray900'],
  ] as const;

  const [, color] = colors.filter(([condition]) => condition)[0] || [];

  return (
    <Root
      data-testid='rovna-ui-columns-settings-column-setting-pin'
      $disabled={disabled}
      size={20}
      color={color}
      onClick={handleClick}
    />
  );
};
