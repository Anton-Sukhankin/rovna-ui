import { ToggleButtonProps } from '@rovna-ui/components/primitives';
import React, { FC } from 'react';

import * as Styled from './HeaderToggleButton.styled';

export const HeaderToggleButton: FC<ToggleButtonProps> = props => {
  return <Styled.HeaderToggleButton {...props} />;
};
