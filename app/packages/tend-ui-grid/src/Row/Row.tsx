import React from 'react';
import AntRow from 'antd-core/es/row';

import { RowProps, RowRef } from './types';

const Row = React.forwardRef<RowRef, RowProps>((props, ref) => {
  return <AntRow data-testid='rovna-ui-row' {...props} ref={ref} />;
});

Row.displayName = 'Row';

export { Row };
