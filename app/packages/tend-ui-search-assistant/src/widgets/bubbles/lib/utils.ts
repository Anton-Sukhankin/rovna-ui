import type { MessageType } from '@search-assistant/entities/message/api/types';
import type { BubblesDateGroupType } from '@search-assistant/entities/message/lib/types';

const TODAY_NAME_STRING = 'Сегодня';

export const groupMessages = (messages: MessageType[]): BubblesDateGroupType =>
  messages.reduce((acc: BubblesDateGroupType, message: MessageType) => {
    const { sender } = message;

    const dateString = TODAY_NAME_STRING;

    if (!acc[dateString]) {
      acc[dateString] = [{ sender, timestamp: message.timestamp, messages: [message] }];
    } else {
      const lastGroupIdx = acc[dateString].length - 1;
      const lastGroup = acc[dateString][lastGroupIdx];
      const appropriateGroup =
        lastGroup.sender === sender && lastGroup.timestamp - message.timestamp < 3e5;

      if (appropriateGroup) {
        const updatedGroup = {
          ...acc[dateString][lastGroupIdx],
          timestamp: message.timestamp,
          messages: [...acc[dateString][lastGroupIdx].messages, message],
        };

        acc[dateString] = [...acc[dateString].slice(0, lastGroupIdx), updatedGroup];
      } else {
        acc[dateString].push({
          sender,
          timestamp: message.timestamp,
          messages: [message],
        });
      }
    }

    return acc;
  }, {});
