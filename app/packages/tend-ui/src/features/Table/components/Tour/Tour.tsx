import React from 'react';
import AntTour from 'antd-core/es/tour';

import { TourContext } from '@rovna-internal/components/features/Table/contexts/TourContext';

import { TourProps } from './types';

const Tour: React.FC<TourProps> = ({ open, onClose, onFinish, children }) => {
  const toolbar = React.useRef<HTMLDivElement>(null);
  const cell = React.useRef<HTMLTableCellElement>(null);
  const sortersButton = React.useRef<HTMLButtonElement>(null);
  const filtersButton = React.useRef<HTMLButtonElement>(null);
  const settingsButton = React.useRef<HTMLButtonElement>(null);

  return (
    <TourContext.Provider
      value={React.useMemo(
        () => ({
          ui: { toolbar, cell, sortersButton, filtersButton, settingsButton },
        }),
        [],
      )}
    >
      {children}
      <AntTour
        open={open}
        onClose={onClose}
        onFinish={onFinish}
        steps={[
          {
            title: 'Все функции таблиц теперь тут!',
            description:
              'Фильтруйте, сортируйте, группируйте и настраивайте таблицу, как удобно вам',
            target: () => toolbar.current as HTMLElement,
          },
          {
            title: 'Эти же функции в столбце!',
            description:
              'Нажимайте на шапку, чтобы фильтровать, сортировать и использовать другие функции таблиц',
            target: () => cell.current as HTMLElement,
          },
          {
            title: 'Настраивайте столбцы как вам удобно!',
            description:
              'Чтобы скрыть ненужные столбцы, откройте контекстное меню и выберите "Скрыть"',
            target: () => cell.current as HTMLElement,
          },
          {
            title: 'Столбец может еще понадобиться?',
            description: 'Чтобы заново его отобразить, воспользуйтесь настройками',
            target: () => settingsButton.current as HTMLElement,
          },
          {
            title: 'Просматривайте только то, что вам нужно!',
            description:
              'Чтобы отфильтровать информацию используйте боковое меню фильтров',
            target: () => filtersButton.current as HTMLElement,
          },
          {
            title: 'Просматривайте только то, что вам нужно!',
            description:
              'Также данные можно отсортировать, используйте выпадающие меню сортировки',
            target: () => sortersButton.current as HTMLElement,
          },
        ]}
      />
    </TourContext.Provider>
  );
};

Tour.displayName = 'Table.Tour';

export { Tour };
