import { Send } from '@rovna-ui/components/icons';
import { Button, TextArea } from '@rovna-ui/components/primitives';
import React, { useCallback, useState } from 'react';

import { useSendMessageMutation } from '@search-assistant/entities/message/api/hooks';
import { MESSAGE_INPUT_CLASSNAME } from '@search-assistant/shared/constants/classnames';

import * as Styled from './MessageInput.styled';

export const MessageInput = () => {
  const [value, setValue] = useState('');
  const { isSending, performSendMessage } = useSendMessageMutation();

  const handleSend = useCallback(
    (event: React.UIEvent) => {
      event.stopPropagation();
      if (isSending) return;

      const formatValue = value.trim();

      if (!formatValue) return;

      setValue('');
      performSendMessage(formatValue);
    },
    [isSending, value, setValue, performSendMessage],
  );

  const handlePressEnter = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.shiftKey) return;

      event.preventDefault();
      handleSend(event);
    },
    [handleSend],
  );

  return (
    <Styled.Container className={MESSAGE_INPUT_CLASSNAME}>
      <TextArea
        autoFocus
        fullWidth
        placeholder='С чем вам помочь?'
        onPressEnter={handlePressEnter}
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
        autoSize={{ minRows: 1, maxRows: 8 }}
        size='large'
      />
      <Button
        disabled={!value || isSending}
        onClick={handleSend}
        loading={isSending}
        before={<Send />}
        size='large'
      />
    </Styled.Container>
  );
};
