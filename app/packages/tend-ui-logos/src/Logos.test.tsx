import React from 'react';
import renderer from 'react-test-renderer';

import * as Logos from '.';

const iconsPack = Object.entries(Logos)
  .filter(([name]) => name !== 'LogoWithBackground')
  .map(value => ({
    name: value[0],
    component: value[1],
  }));

describe.each(iconsPack)('$name logo', ({ component: Component }) => {
  it('renders correctly', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - LogoWithBackground исключен из тестов
    const snap = renderer.create(<Component />);
    expect(snap).toMatchSnapshot();
  });
});
