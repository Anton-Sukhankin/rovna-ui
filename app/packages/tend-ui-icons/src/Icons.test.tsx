import React from 'react';
import renderer from 'react-test-renderer';

import * as Icons from '.';

const iconsPack = Object.entries(Icons).map(value => ({
  name: value[0],
  component: value[1],
}));

const deprecatedIcons = ['Sort', 'SortAlt', 'FilterList', 'FilterListOff'] as const;

describe.each(iconsPack)('$name icon', ({ component: Component }) => {
  it('renders correctly', () => {
    const snap = renderer.create(<Component />);
    expect(snap).toMatchSnapshot();
  });

  it('with custom "size" renders correctly', () => {
    const snap = renderer.create(<Component size={60} />);
    expect(snap).toMatchSnapshot();
  });

  it('with custom "color" preset renders correctly', () => {
    const snap = renderer.create(<Component color='blue600' />);
    expect(snap).toMatchSnapshot();
  });

  it('with custom "color" renders correctly', () => {
    const snap = renderer.create(<Component color='red' />);
    expect(snap).toMatchSnapshot();
  });

  it('with custom "padding" renders correctly', () => {
    const snap = renderer.create(<Component padding='24px' />);
    expect(snap).toMatchSnapshot();
  });

  it.each(deprecatedIcons)('%s icon should be deprecated', name => {
    // eslint-disable-next-line import/namespace
    const C = Icons[name];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(C.__DEPRECATED).toBeTruthy();
  });
});
