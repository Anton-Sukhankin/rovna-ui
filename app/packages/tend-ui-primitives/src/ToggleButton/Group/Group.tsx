import React from 'react';
import { Box } from '@rovna-ui/grid';

import { ToggleButtonGroupContext } from '../context';
import { ToggleButtonGroupProps } from '../types';

/**
 * @deprecated Экспериментальное API. Не используйте в продакшене
 */
const Group = <T = unknown,>({ onChange, children }: ToggleButtonGroupProps<T>) => {
  return (
    <ToggleButtonGroupContext.Provider
      value={React.useMemo(() => ({ onChange }), [onChange])}
    >
      <Box>{children}</Box>
    </ToggleButtonGroupContext.Provider>
  );
};

Group.displayName = 'ToggleButton.Group';

export { Group };
