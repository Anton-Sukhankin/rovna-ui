import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Accordion } from './Accordion';

describe('Accordion', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <Accordion
        items={[
          {
            key: '1',
            title: 'Title 1',
            description: 'Description 1',
            children:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, quam!',
          },
        ]}
      />,
    );

    expect(snap).toMatchSnapshot();
  });

  it('opened renders correctly', () => {
    const snap = snapshotWithTheme(
      <Accordion
        defaultActiveKey={['1']}
        items={[
          {
            key: '1',
            title: 'Title 1',
            description: 'Description 1',
            children:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, quam!',
          },
        ]}
      />,
    );

    expect(snap).toMatchSnapshot();
  });

  it('with extra renders correctly', () => {
    const snap = snapshotWithTheme(
      <Accordion
        defaultActiveKey={['1']}
        items={[
          {
            key: '1',
            title: 'Title 1',
            description: 'Description 1',
            children:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, quam!',
            extra: <span>Extra child</span>,
          },
        ]}
      />,
    );

    expect(snap).toMatchSnapshot();
  });
});
