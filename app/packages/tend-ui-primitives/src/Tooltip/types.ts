import React from 'react';
import AntTooltip from 'antd-core/es/tooltip';

type AntTooltipProps = React.ComponentPropsWithoutRef<typeof AntTooltip>;
export type TooltipRef = React.ElementRef<typeof AntTooltip>;
export type TooltipProps = Omit<AntTooltipProps, 'color'> & {
  /**
   * Позволяет отображать непечатные переносы (`\n`)
   */
  lineBreak?: boolean;
};
