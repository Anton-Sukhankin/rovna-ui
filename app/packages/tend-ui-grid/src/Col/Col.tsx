import React from 'react';
import AntCol from 'antd-core/es/col';

import { ColProps, ColRef } from './types';

const Col = React.forwardRef<ColRef, ColProps>((props, ref) => {
  return <AntCol data-testid='rovna-ui-col' {...props} ref={ref} />;
});

Col.displayName = 'Col';

export { Col };
