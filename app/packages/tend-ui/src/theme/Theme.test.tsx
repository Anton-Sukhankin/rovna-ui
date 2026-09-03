import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from '@rovna-internal/components/primitives';

import { RovnaUI } from './RovnaUI';

describe('ThemeProvider', () => {
  it('renders SamoletTheme correctly', () => {
    const snap = renderer.create(
      <RovnaUI>
        <Button>Button with SamoletTheme</Button>
      </RovnaUI>,
    );

    expect(snap).toMatchSnapshot();
  });

  it('renders GlobalTheme correctly', () => {
    const snap = renderer.create(
      <RovnaUI theme='global'>
        <Button>Button with SamoletTheme</Button>
      </RovnaUI>,
    );

    expect(snap).toMatchSnapshot();
  });
});
