import React from 'react';

export type BreadcrumbsItem = {
  /** Стабильный идентификатор уровня навигации. */
  key: React.Key;
  /** Видимая подпись уровня. */
  label: React.ReactNode;
  /** Адрес перехода. Последний элемент всегда отображается как текущая страница. */
  href?: string;
  /** Необязательная иконка перед подписью. */
  icon?: React.ReactNode;
  /** Обработчик перехода для ссылки или навигационной кнопки. */
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
  /** Стандартный атрибут ссылки target. */
  target?: React.HTMLAttributeAnchorTarget;
  /** Стандартный атрибут ссылки rel. */
  rel?: string;
  /** Полный текст для подсказки при сокращенной подписи. */
  title?: string;
};

export type BreadcrumbsRef = HTMLElement;

export type BreadcrumbsProps = Omit<
  React.ComponentPropsWithoutRef<'nav'>,
  'children'
> & {
  /** Уровни иерархии от корня до текущей страницы. */
  items: readonly BreadcrumbsItem[];
  /** Разделитель между уровнями. */
  separator?: React.ReactNode;
  /** Максимальное число видимых уровней без учета кнопки раскрытия. */
  maxItems?: number;
  /** Максимальная ширина подписи одного уровня. */
  maxItemWidth?: React.CSSProperties['maxWidth'];
  /** Управляемое состояние раскрытия длинной цепочки. */
  expanded?: boolean;
  /** Начальное состояние раскрытия длинной цепочки. */
  defaultExpanded?: boolean;
  /** Вызывается при раскрытии скрытых уровней. */
  onExpandedChange?: (expanded: boolean) => void;
  /** Доступное название кнопки раскрытия. */
  expandLabel?: string;
};
