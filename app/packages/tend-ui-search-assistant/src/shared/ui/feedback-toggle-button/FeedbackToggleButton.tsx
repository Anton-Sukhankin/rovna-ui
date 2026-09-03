import React, { FC } from 'react';
import { ToggleButtonProps } from '@rovna-ui/components/primitives';

import * as Styled from './FeedbackToggleButton.styled';

export const FeedbackToggleButton: FC<ToggleButtonProps> = props => {
  return <Styled.FeedbackToggleButton {...props} />;
};
