import React from 'react';

import { DragIndicator } from './styled';
import { useColumnsSettingContext } from '../../contexts';
import { DragHandleProps } from './types';

const DragHandle: React.FC<DragHandleProps> = ({ disabled, children, 'aria-label': ariaLabel }) => {
  const context = useColumnsSettingContext();
  const content = children ?? (
    <DragIndicator size={20} color={disabled ? 'gray500' : 'gray900'} />
  );

  return (
    <span
      data-testid='rovna-ui-columns-settings-column-setting-drag'
      aria-label={ariaLabel ?? 'Изменить порядок столбца'}
      ref={context.setActivatorNodeRef}
      {...context.attributes}
      {...context.listeners}
    >
      {content}
    </span>
  );
};

export { DragHandle };
