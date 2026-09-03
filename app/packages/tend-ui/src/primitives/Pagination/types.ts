import React from 'react';
import AntPagination from 'antd-core/es/pagination';

import { TooltipProps } from '@rovna-internal/components/primitives/Tooltip';

type AntPaginationProps = React.ComponentPropsWithoutRef<typeof AntPagination>;
export type PaginationProps = Omit<
  AntPaginationProps,
  'size' | 'prevIcon' | 'nextIcon' | 'jumpPrevIcon' | 'jumpNextIcon' | 'locale'
> & {
  size?: 'small' | 'medium';
  prevIconTooltip?: Omit<TooltipProps, 'children'>;
  nextIconTooltip?: Omit<TooltipProps, 'children'>;
  locale?: Omit<AntPaginationProps['locale'], 'page'>;
};
