import {
  LK10D,
  LK10DColored,
  Pass10DColored,
  Plan10DColored,
  Quality10DColored,
} from '@rovna-ui/logos';
import React from 'react';

import { Header, HeaderProps } from '@rovna-ui/header';

const moduleNames = {
  Pass10D: 'Pass10D',
  Plan10D: 'Plan10D',
  Quality10D: 'Quality10D',
  LK10D: 'LK10D',
};

export const props: HeaderProps = {
  burger: {
    items: [
      {
        key: `service_item_1`,
        label: 'Пасс 10D',
        icon: <Pass10DColored />,
      },
      {
        key: `service_item_2`,
        label: 'План 10D',
        icon: <Plan10DColored />,
      },
      {
        key: `service_item_3`,
        label: 'Качество 10D',
        icon: <Quality10DColored />,
      },
      {
        key: 'divider_item_1',
        type: 'divider',
      },
      {
        key: `service_item_4`,
        label: 'Личный кабинет',
        icon: <LK10DColored />,
      },
    ],
    mode: 'none',
    onSelect: (keys: string[]) => {
      const [key] = keys;
      console.info(`[Storybook] Выбран локальный демонстрационный сервис: ${key}`);
    },
  },
  stand: 'stage',
  logo: {
    before: <LK10D />,
    children: 'Личный кабинет',
  },
  tenantLogo: {
    logoName: 'fsk',
  },
  project: {
    api: () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new Promise<any>(resolve => {
        setTimeout(() => {
          resolve({
            results: [
              { id: 1, name: 'Алхимово' },
              { id: 2, name: 'Вереск' },
              { id: 3, name: 'Пригород Лесное' },
              { id: 4, name: 'Егорово Парк' },
            ],
          });
        }, 2000);
      }),
  },
  support: {
    alertText:
      'Опционально-настраиваемый клиентом текст, в котором он указывает контактные данные своего админа для быстрой помощи\n\nhelp@client_domain.ru',
    moduleOptions: [
      {
        label: moduleNames.Pass10D,
        value: moduleNames.Pass10D,
      },
      {
        label: moduleNames.Plan10D,
        value: moduleNames.Plan10D,
      },
      {
        label: moduleNames.Quality10D,
        value: moduleNames.Quality10D,
      },
      {
        label: moduleNames.LK10D,
        value: moduleNames.LK10D,
      },
    ],
    module: 'LK10D',
    onSend: state => {
      console.info(state);

      return new Promise((resolve, reject) => {
        if (Math.random() < 0.5) {
          // В случае успешной отправки - Drawer скроется
          resolve();
        } else {
          // В случае неуспешной отправки - сработает Toast.error
          // Проверьте, что он инициализирован в проекте
          reject();
        }
      });
    },
    fio: 'Самойлов Валентин',
    email: 'username@client_domain.com',
    version: '10DКонтрольКачества_S25Q33_1.100.0',
  },
  authorization: {
    onSignup: () => {
      console.info(
        'Вы нажали на кнопку "Регистрация". Если сделать event.preventDefault(), то следующий переход не сработает и можно написать свою логику в этом обработчике',
      );
    },
    onSignin: () => {
      console.info(
        'Вы нажали на кнопку "Войти". Если сделать event.preventDefault(), то следующий переход не сработает и можно написать свою логику в этом обработчике',
      );
    },
  },
  profile: {
    title: 'Квокка Квокковна',
    description: 'user@example.com',
    avatar: {
      src: '/media/demo-avatar.svg',
    },
  },
  navigation: {
    defaultSelectedKeys: ['1'],
    onSelect: (path: string[]) => {
      console.info(path);
    },
    items: [
      {
        key: '1',
        label: 'Доступы',
      },
      {
        key: '2',
        label: 'Справочники',
      },
    ],
  },
};

export const Template = () => {
  return <Header {...props} />;
};
