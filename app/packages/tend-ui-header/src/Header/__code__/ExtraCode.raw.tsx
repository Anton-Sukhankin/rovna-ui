import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from '@rovna-ui/icons';
import { Paragraph } from '@rovna-ui/typography';

import { Header, HeaderProps } from '@rovna-ui/header';

export const props: HeaderProps = {
  extra: (
    <Paragraph margin={0} color='gray0'>
      Дополнительный слот для кастомного контента
    </Paragraph>
  ),
  burger: {
    portionSize: 4,
    items: Array.from({ length: 6 }).map((_, groupIndex) => ({
      key: `group_${groupIndex}`,
      type: 'group',
      label: `Кастомная группа ${groupIndex}`,
      children: Array.from({ length: 4 }).map((_, itemIndex) => ({
        key: `group_${groupIndex}_item_${itemIndex}`,
        label: `Кастомный проект ${itemIndex}`,
        icon: <Home />,
      })),
    })),
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
  stand: 'stage',
  logo: { children: '10D' },
  profile: {
    title: 'Квокка Квокковна',
    description: 'user@example.com',
    avatar: {
      src: '/media/demo-avatar.svg',
    },
  },
  navigation: {
    defaultSelectedKeys: ['2'],
    onSelect: (path: string[]) => {
      console.info(path);
    },
    items: [
      {
        key: '1',
        label: 'Меню 1',
        children: [
          { key: '14', label: <Link to='/menu-14'>Меню 14</Link> },
          { key: '15', label: <Link to='/menu-15'>Меню 15</Link> },
          {
            key: '16',
            label: <Link to='/menu-16'>Меню 16</Link>,
            badge: { type: 'dot' },
          },
        ],
      },
      {
        key: '2',
        label: <Link to='/menu-2'>Меню 2</Link>,
      },
      {
        key: '3',
        label: <Link to='/menu-3'>Меню 3</Link>,
        badge: { type: 'counter', inner: 50 },
      },
      { key: '4', label: <Link to='/menu-4'>Меню 4</Link> },
      { key: '5', label: <Link to='/menu-5'>Меню 5</Link>, badge: { type: 'dot' } },
      { key: '6', label: <Link to='/menu-6'>Меню 6</Link> },
      { key: '7', label: <Link to='/menu-7'>Меню 7</Link> },
      { key: '8', label: <Link to='/menu-8'>Меню 8</Link> },
      { key: '9', label: <Link to='/menu-9'>Меню 9</Link> },
      { key: '10', label: <Link to='/menu-10'>Меню 10</Link> },
      { key: '11', label: <Link to='/menu-11'>Меню 11</Link> },
      {
        key: '12',
        label: <Link to='/menu-12'>Меню 12</Link>,
        badge: { type: 'counter', inner: 100 },
      },
      { key: '13', label: <Link to='/menu-13'>Меню 13</Link> },
    ],
  },
};

export const Template = () => {
  return <Header {...props} />;
};
