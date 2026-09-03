import React from 'react';
import { ChevronRight } from '@rovna-ui/icons/ChevronRight';
import { MoreHoriz } from '@rovna-ui/icons/MoreHoriz';
import { useTheme } from '@rovna-ui/theme';

import {
  CurrentItem,
  ExpandButton,
  Item,
  ItemIcon,
  ItemLabel,
  Link,
  List,
  NavigationButton,
  Root,
  Separator,
  StaticItem,
} from './styled';
import { BreadcrumbsItem, BreadcrumbsProps, BreadcrumbsRef } from './types';

type VisibleEntry =
  | { type: 'item'; item: BreadcrumbsItem; originalIndex: number }
  | { type: 'collapse'; hiddenCount: number };

const toCssSize = (value: React.CSSProperties['maxWidth']) =>
  typeof value === 'number' ? `${value}px` : value || '240px';

const getVisibleEntries = (
  items: readonly BreadcrumbsItem[],
  maxItems: number | undefined,
  expanded: boolean,
): VisibleEntry[] => {
  const allItems = items.map((item, originalIndex) => ({
    type: 'item' as const,
    item,
    originalIndex,
  }));

  if (
    expanded ||
    maxItems === undefined ||
    !Number.isFinite(maxItems) ||
    items.length <= Math.max(2, Math.floor(maxItems))
  ) {
    return allItems;
  }

  const visibleItemsCount = Math.max(2, Math.floor(maxItems));
  const tailCount = visibleItemsCount - 1;
  const tailStart = items.length - tailCount;

  return [
    allItems[0],
    { type: 'collapse', hiddenCount: tailStart - 1 },
    ...allItems.slice(tailStart),
  ];
};

const BaseBreadcrumbs = (
  {
    items,
    separator = <ChevronRight size={16} color='currentColor' />,
    maxItems,
    maxItemWidth = 240,
    expanded,
    defaultExpanded = false,
    onExpandedChange,
    expandLabel = 'Показать скрытые уровни навигации',
    'aria-label': ariaLabel = 'Хлебные крошки',
    ...props
  }: BreadcrumbsProps,
  ref: React.ForwardedRef<BreadcrumbsRef>,
) => {
  const theme = useTheme();
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded);
  const isExpanded = expanded ?? internalExpanded;
  const visibleEntries = getVisibleEntries(items, maxItems, isExpanded);
  const itemMaxWidth = toCssSize(maxItemWidth);

  const handleExpand = React.useCallback(() => {
    if (expanded === undefined) setInternalExpanded(true);
    onExpandedChange?.(true);
  }, [expanded, onExpandedChange]);

  if (items.length === 0) return null;

  return (
    <Root
      data-testid='rovna-ui-breadcrumbs'
      {...props}
      ref={ref}
      theme={theme}
      aria-label={ariaLabel}
    >
      <List>
        {visibleEntries.map((entry, index) => {
          const isLastVisibleEntry = index === visibleEntries.length - 1;

          if (entry.type === 'collapse') {
            const accessibleLabel = `${expandLabel}: ${entry.hiddenCount}`;

            return (
              <Item key='breadcrumbs-collapse'>
                <ExpandButton
                  type='button'
                  theme={theme}
                  aria-label={accessibleLabel}
                  aria-expanded='false'
                  title={accessibleLabel}
                  onClick={handleExpand}
                >
                  <MoreHoriz size={20} color='currentColor' aria-hidden='true' />
                </ExpandButton>
                {!isLastVisibleEntry && (
                  <Separator
                    data-testid='rovna-ui-breadcrumbs-separator'
                    theme={theme}
                    aria-hidden='true'
                  >
                    {separator}
                  </Separator>
                )}
              </Item>
            );
          }

          const { item, originalIndex } = entry;
          const isCurrent = originalIndex === items.length - 1;
          const title = item.title || (typeof item.label === 'string' ? item.label : undefined);
          const content = (
            <>
              {item.icon && <ItemIcon aria-hidden='true'>{item.icon}</ItemIcon>}
              <ItemLabel $maxWidth={itemMaxWidth} title={title}>
                {item.label}
              </ItemLabel>
            </>
          );

          let itemContent: React.ReactNode;
          if (isCurrent) {
            itemContent = (
              <CurrentItem theme={theme} aria-current='page'>
                {content}
              </CurrentItem>
            );
          } else if (item.href) {
            itemContent = (
              <Link
                theme={theme}
                href={item.href}
                target={item.target}
                rel={item.rel}
                onClick={event => item.onClick?.(event)}
              >
                {content}
              </Link>
            );
          } else if (item.onClick) {
            itemContent = (
              <NavigationButton
                type='button'
                theme={theme}
                onClick={event => item.onClick?.(event)}
              >
                {content}
              </NavigationButton>
            );
          } else {
            itemContent = <StaticItem theme={theme}>{content}</StaticItem>;
          }

          return (
            <Item key={item.key}>
              {itemContent}
              {!isLastVisibleEntry && (
                <Separator
                  data-testid='rovna-ui-breadcrumbs-separator'
                  theme={theme}
                  aria-hidden='true'
                >
                  {separator}
                </Separator>
              )}
            </Item>
          );
        })}
      </List>
    </Root>
  );
};

const Breadcrumbs = React.forwardRef<BreadcrumbsRef, BreadcrumbsProps>(BaseBreadcrumbs);

Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs };
