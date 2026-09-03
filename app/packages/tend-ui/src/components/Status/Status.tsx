import React from 'react';

import { StatusProps } from './types';
import { Forbidden, InternalServerError, NotFound } from './components';

const Status = ({ status = 404, ...props }: StatusProps) =>
  ({
    404: <NotFound {...props} />,
    403: <Forbidden {...props} />,
    500: <InternalServerError {...props} />,
  }[status]);

Status.displayName = 'Status';

export { Status };
