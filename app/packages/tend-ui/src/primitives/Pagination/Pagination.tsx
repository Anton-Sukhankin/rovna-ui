import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { ChevronLeft } from '@rovna-ui/icons/ChevronLeft';
import { ChevronRight } from '@rovna-ui/icons/ChevronRight';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { Tooltip } from '@rovna-internal/components/primitives/Tooltip';

import { PaginationProps } from './types';
import { PaginationButton, Root } from './styled';

const Pagination = ({
  size = 'medium',
  showLessItems = true,
  prevIconTooltip,
  nextIconTooltip,
  defaultPageSize,
  pageSize: controlledPageSize,
  onShowSizeChange: onShowSizeChangeProp,
  total,
  locale: localeProp,
  ...props
}: PaginationProps) => {
  const theme = useTheme();
  const t = useTranslation();

  // Управляемый pageSize: если значение передано, используем его, иначе state.
  const [innerPageSize, setInnerPageSize] = useState(defaultPageSize ?? 10);
  const pageSize = controlledPageSize ?? innerPageSize;

  // Обработчик смены размера страницы
  const onShowSizeChange = useCallback(
    (current: number, newSize: number) => {
      if (controlledPageSize === undefined) setInnerPageSize(newSize);
      onShowSizeChangeProp?.(current, newSize);
    },
    [controlledPageSize, onShowSizeChangeProp],
  );

  const isSinglePage = useMemo(() => (total ?? 0) <= pageSize, [total, pageSize]);

  const locale = useMemo(
    () => ({
      jump_to: t(['primitives', 'Pagination', 'jumpto']),
      items_per_page: '',
      ...localeProp,
      page: '',
    }),
    [t, localeProp],
  );

  const sizeProp = (
    {
      medium: 'default',
      small: 'small',
    } as const
  )[size];

  return (
    <Root
      data-testid='rovna-ui-pagination'
      showLessItems={showLessItems}
      defaultPageSize={defaultPageSize}
      total={total}
      {...props}
      $theme={theme}
      $singlePage={isSinglePage}
      pageSize={pageSize}
      onShowSizeChange={onShowSizeChange}
      prevIcon={
        <PaginationButton $size={size} theme={theme}>
          <ChevronLeft />
        </PaginationButton>
      }
      nextIcon={
        <PaginationButton $size={size} theme={theme}>
          <ChevronRight />
        </PaginationButton>
      }
      jumpPrevIcon={
        <Tooltip title={t(['primitives', 'Pagination', 'prev'])} {...prevIconTooltip}>
          <PaginationButton data-testid='jump-prev-icon' $size={size} theme={theme}>
            ...
          </PaginationButton>
        </Tooltip>
      }
      jumpNextIcon={
        <Tooltip title={t(['primitives', 'Pagination', 'next'])} {...nextIconTooltip}>
          <PaginationButton data-testid='jump-next-icon' $size={size} theme={theme}>
            ...
          </PaginationButton>
        </Tooltip>
      }
      size={sizeProp}
      locale={locale}
    />
  );
};

export { Pagination };
