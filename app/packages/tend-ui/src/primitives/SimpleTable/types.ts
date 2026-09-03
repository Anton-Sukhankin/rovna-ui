import React from 'react';
import { MarginProperties } from '@rovna-ui/styling';

import { Size } from '@rovna-internal/components/types/Size';

export type SimpleTableRef = React.ElementRef<'table'>;
export type SimpleTableProps = React.ComponentPropsWithRef<'table'> &
  MarginProperties & {
    loading?: boolean;
    size?: Size;
  };
