import React, { useCallback, useMemo } from 'react';
import { Checkbox } from '@rovna-ui/components/primitives';

import {
  useNotificationsChecked,
  useNotificationsToggleChecked,
} from '@notifications/app/store/hooks';

import * as Styled from './CheckButton.styled';

type CheckButtonProps = {
  id: number;
};

export const CheckButton = ({ id }: CheckButtonProps) => {
  const checked = useNotificationsChecked();
  const toggleChecked = useNotificationsToggleChecked();

  const isChecked = useMemo(() => checked.has(id), [id, checked]);
  const handleChange = useCallback(() => toggleChecked(id), [id, toggleChecked]);

  return (
    <Styled.Wrapper id='notification-checkbox' $checked={isChecked}>
      <Checkbox checked={isChecked} onChange={handleChange} />
    </Styled.Wrapper>
  );
};
