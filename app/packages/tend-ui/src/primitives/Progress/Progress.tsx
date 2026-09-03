import React from 'react';
import AntProgress from 'antd-core/es/progress';

import { ProgressProps, ProgressRef } from './types';

const Progress = React.forwardRef<ProgressRef, ProgressProps>(
  ({ size, ...props }, ref) => {
    const sizeProp = (() => {
      if (size === 'medium') return 'default';

      return size;
    })();

    return (
      <AntProgress data-testid='rovna-ui-progress' {...props} ref={ref} size={sizeProp} />
    );
  },
);

Progress.displayName = 'Progress';

export { Progress };
