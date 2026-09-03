import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbsItem } from './types';

const items: BreadcrumbsItem[] = [
  { key: 'home', label: 'Главная', href: '/home' },
  { key: 'projects', label: 'Проекты', href: '/projects' },
  { key: 'current', label: 'Карточка проекта' },
];

describe('Breadcrumbs', () => {
  it('renders a labelled navigation landmark and marks the current page', () => {
    render(<Breadcrumbs items={items} />);

    expect(
      screen.getByRole('navigation', { name: 'Хлебные крошки' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Главная' })).toHaveAttribute(
      'href',
      '/home',
    );
    expect(screen.getByRole('link', { name: 'Проекты' })).toHaveAttribute(
      'href',
      '/projects',
    );
    expect(screen.getByText('Карточка проекта').closest('[aria-current="page"]'))
      .toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Карточка проекта' }),
    ).not.toBeInTheDocument();
  });

  it('renders a single item as the current page', () => {
    render(<Breadcrumbs items={[items[2]]} />);

    expect(screen.getByText('Карточка проекта').closest('[aria-current="page"]'))
      .toBeInTheDocument();
    expect(screen.queryAllByTestId('rovna-ui-breadcrumbs-separator')).toHaveLength(0);
  });

  it('hides middle levels when maxItems is exceeded', () => {
    const longItems: BreadcrumbsItem[] = [
      items[0],
      { key: 'catalog', label: 'Каталог', href: '/catalog' },
      { key: 'section', label: 'Раздел', href: '/section' },
      { key: 'group', label: 'Группа', href: '/group' },
      items[2],
    ];

    render(<Breadcrumbs items={longItems} maxItems={3} />);

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.queryByText('Каталог')).not.toBeInTheDocument();
    expect(screen.queryByText('Раздел')).not.toBeInTheDocument();
    expect(screen.getByText('Группа')).toBeInTheDocument();
    expect(screen.getByText('Карточка проекта')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: 'Показать скрытые уровни навигации: 2',
      }),
    ).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands hidden levels and reports the state change', () => {
    const onExpandedChange = jest.fn();
    const longItems: BreadcrumbsItem[] = [
      items[0],
      { key: 'catalog', label: 'Каталог', href: '/catalog' },
      { key: 'section', label: 'Раздел', href: '/section' },
      items[2],
    ];

    render(
      <Breadcrumbs
        items={longItems}
        maxItems={2}
        onExpandedChange={onExpandedChange}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Показать скрытые уровни навигации: 2',
      }),
    );

    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Раздел')).toBeInTheDocument();
    expect(onExpandedChange).toHaveBeenCalledWith(true);
  });

  it('supports a controlled collapsed state', () => {
    const onExpandedChange = jest.fn();
    const longItems: BreadcrumbsItem[] = [
      items[0],
      { key: 'catalog', label: 'Каталог', href: '/catalog' },
      items[2],
    ];

    render(
      <Breadcrumbs
        items={longItems}
        maxItems={2}
        expanded={false}
        onExpandedChange={onExpandedChange}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Показать скрытые уровни навигации: 1',
      }),
    );

    expect(screen.queryByText('Каталог')).not.toBeInTheDocument();
    expect(onExpandedChange).toHaveBeenCalledWith(true);
  });

  it('renders an onClick-only level as a navigation button', () => {
    const onClick = jest.fn();
    render(
      <Breadcrumbs
        items={[
          { key: 'catalog', label: 'Каталог', onClick },
          { key: 'current', label: 'Текущий раздел', onClick },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Каталог' }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByRole('button', { name: 'Текущий раздел' }),
    ).not.toBeInTheDocument();
  });

  it('keeps separators decorative for assistive technology', () => {
    render(<Breadcrumbs items={items} separator='/' />);

    const separators = screen.getAllByTestId('rovna-ui-breadcrumbs-separator');
    expect(separators).toHaveLength(2);
    separators.forEach(separator => {
      expect(separator).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('supports a custom navigation label and full label title', () => {
    render(
      <Breadcrumbs
        aria-label='Навигация по каталогу'
        items={items}
        maxItemWidth={120}
      />,
    );

    expect(
      screen.getByRole('navigation', { name: 'Навигация по каталогу' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Карточка проекта')).toHaveAttribute(
      'title',
      'Карточка проекта',
    );
  });

  it('renders nothing when there are no hierarchy levels', () => {
    const { container } = render(<Breadcrumbs items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
