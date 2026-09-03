import React from 'react';
import AntCollapse from 'antd-core/es/collapse';

type AntCollapseProps = React.ComponentPropsWithoutRef<typeof AntCollapse>;
type AntCollapseItem = NonNullable<AntCollapseProps['items']>[number];
export type AccordionRef = React.ElementRef<typeof AntCollapse>;
export type AccordionItem = AntCollapseItem & {
  title?: React.ReactNode;
  description?: React.ReactNode;
};
export type AccordionProps = Omit<
  AntCollapseProps,
  'items' | 'expandIcon' | 'size' | 'ghost' | 'bordered'
> & {
  items?: AccordionItem[];
};
