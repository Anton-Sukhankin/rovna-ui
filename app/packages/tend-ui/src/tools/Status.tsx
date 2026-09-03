import React from 'react';
import { colors } from '@rovna-ui/tokens/samolet';
import { Tag, Tooltip } from '@rovna-ui/primitives';

export const Status = ({
  status,
}: {
  status:
    | 'draft'
    | 'design'
    | 'approval'
    | 'develop'
    | 'ready'
    | 'deprecated'
    | 'unstable';
}) => {
  const { text, backgroundColor, description } = {
    deprecated: {
      text: 'Устарело',
      backgroundColor: colors['gray100-transparent'],
      description: 'Компонент устарел и удален из Figma',
    },
    unstable: {
      text: 'Нестабильно',
      backgroundColor: colors['gray100-transparent'],
      description:
        'Компонент нестабилен и его API может измениться в рамках минора/фикса',
    },
    draft: {
      text: 'Черновик',
      backgroundColor: colors['gray200-transparent'],
      description: 'Компонент находится на этапе прототипирования',
    },
    design: {
      text: 'В процессе',
      backgroundColor: colors['gold200-transparent'],
      description: 'Компонент находится на разработки макета и документации',
    },
    approval: {
      text: 'На согласовании',
      backgroundColor: colors.purple100,
      description: 'Компонент находится на этапе согласования с дизайн командой',
    },
    develop: {
      text: 'Разработка в коде',
      backgroundColor: colors['blue200-transparent'],
      description: 'Компонент согласован и дорабатывается в коде',
    },
    ready: {
      text: 'Готов',
      backgroundColor: colors['green200-transparent'],
      description: 'Компонент готов и согласован',
    },
  }[status];

  return (
    <Tooltip title={description}>
      <Tag color='gray900' backgroundColor={backgroundColor}>
        {text}
      </Tag>
    </Tooltip>
  );
};
