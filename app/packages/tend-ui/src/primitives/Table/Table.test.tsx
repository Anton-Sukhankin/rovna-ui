import React from 'react';
import { render } from '@testing-library/react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';
import { GenericObject } from '@rovna-internal/components/types/GenericObject';

import { Table } from './Table';
import { ColumnType } from './types';

const dataSource = [
  {
    key: '1',
    name: 'Justin Weimann Jr.',
    job: 'Chief Data Consultant',
    bio: 'geek, musician, engineer',
    sex: 'female',
    zodiac: 'Gemini',
    salary: 3762,
  },
  {
    key: '2',
    name: "Elmer O'Keefe",
    job: 'Corporate Applications Director',
    bio: 'veteran, inventor, student',
    sex: 'female',
    zodiac: 'Aquarius',
    salary: 3159,
  },
  {
    key: '3',
    name: 'Victor Hoppe',
    job: 'Direct Quality Administrator',
    bio: 'developer, gamer',
    sex: 'female',
    zodiac: 'Pisces',
    salary: 2603,
  },
  {
    key: '4',
    name: 'Celia Hodkiewicz',
    job: 'Direct Group Designer',
    bio: 'teacher, leader, gamer ☂️',
    sex: 'female',
    zodiac: 'Capricorn',
    salary: 3178,
  },
  {
    key: '5',
    name: 'Warren Rodriguez III',
    job: 'Corporate Research Executive',
    bio: 'filmmaker, scientist',
    sex: 'female',
    zodiac: 'Aries',
    salary: 5801,
  },
  {
    key: '6',
    name: 'Neil Reichel',
    job: 'Global Integration Associate',
    bio: 'educator, philosopher, friend ⚕️',
    sex: 'female',
    zodiac: 'Virgo',
    salary: 2435,
  },
  {
    key: '7',
    name: 'Audrey Jacobson',
    job: 'Direct Directives Analyst',
    bio: 'orchid devotee, veteran',
    sex: 'male',
    zodiac: 'Capricorn',
    salary: 2768,
  },
  {
    key: '8',
    name: 'Christie Marquardt',
    job: 'Human Applications Agent',
    bio: 'hatchling advocate  🇬🇱',
    sex: 'male',
    zodiac: 'Pisces',
    salary: 2219,
  },
  {
    key: '9',
    name: 'Everett Stokes',
    job: 'Investor Marketing Administrator',
    bio: 'windscreen fan  🎁',
    sex: 'female',
    zodiac: 'Pisces',
    salary: 5106,
  },
  {
    key: '10',
    name: 'Francisco Green',
    job: 'Corporate Assurance Administrator',
    bio: 'usher advocate, dreamer',
    sex: 'male',
    zodiac: 'Capricorn',
    salary: 5892,
  },
];
const columns: ColumnType<GenericObject>[] = [
  {
    key: 'name',
    title: 'name',
    dataIndex: 'name',
  },
  {
    key: 'job',
    title: 'job',
    dataIndex: 'job',
  },
  {
    key: 'bio',
    title: 'bio',
    dataIndex: 'bio',
  },
  {
    key: 'sex',
    title: 'sex',
    dataIndex: 'sex',
  },
  {
    key: 'zodiac',
    title: 'zodiac',
    dataIndex: 'zodiac',
  },
  {
    key: 'salary',
    title: 'salary',
    dataIndex: 'salary',
    sorter: (a, b) => a.salary - b.salary,
  },
];

describe('Table', () => {
  it('makes the scrollable content keyboard-focusable', () => {
    const renderer = render(<Table dataSource={dataSource} columns={columns} />);
    const content = renderer.container.querySelector('[class*="-table-content"]');

    expect(content).toHaveAttribute('tabindex', '0');
    expect(content).toHaveAttribute('role', 'region');
    expect(content).toHaveAccessibleName('Прокручиваемая таблица');
  });

  describe.each(['large', 'medium', 'small'] as const)('%s size', size => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <Table size={size} dataSource={dataSource} columns={columns} />,
      );
      expect(snap).toMatchSnapshot();
    });

    it('with border renders correctly', () => {
      const snap = snapshotWithTheme(
        <Table bordered size={size} dataSource={dataSource} columns={columns} />,
      );
      expect(snap).toMatchSnapshot();
    });

    describe('when "empty" is not given', () => {
      it('renders correctly', () => {
        const snap = snapshotWithTheme(
          <Table size={size} dataSource={[]} columns={columns} />,
        );
        expect(snap).toMatchSnapshot();
        const renderer = render(<Table size={size} dataSource={[]} columns={columns} />);
        expect(renderer.getByText(/Нет данных/)).toBeInTheDocument();
      });
    });

    describe('when "empty" is given', () => {
      it('renders correctly', () => {
        const snap = snapshotWithTheme(
          <Table size={size} dataSource={[]} columns={columns} />,
        );
        expect(snap).toMatchSnapshot();
        const renderer = render(
          <Table
            size={size}
            dataSource={[]}
            columns={columns}
            empty={{
              title: 'Ничего не найдено',
              description: 'Возможно ваши фильтры что-то скрывают',
            }}
          />,
        );
        expect(renderer.getByText(/Ничего не найдено/)).toBeInTheDocument();
        expect(
          renderer.getByText(/Возможно ваши фильтры что-то скрывают/),
        ).toBeInTheDocument();
      });
    });
  });
});
