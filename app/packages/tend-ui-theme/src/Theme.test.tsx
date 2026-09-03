import React from 'react';
import renderer from 'react-test-renderer';

import { Theme, useTheme } from './Theme';

const Consumer: React.FC = () => {
  const theme = useTheme();

  return <div>{theme.colors.blue100}</div>;
};

describe('ThemeProvider', () => {
  it('renders SamoletTheme correctly', () => {
    const snap = renderer.create(
      <Theme theme='samolet'>
        <Consumer>Consumer with SamoletTheme</Consumer>
      </Theme>,
    );

    expect(snap).toMatchSnapshot();
  });

  it('renders GlobalTheme correctly', () => {
    const snap = renderer.create(
      <Theme theme='global'>
        <Consumer>Consumer with SamoletTheme</Consumer>
      </Theme>,
    );

    expect(snap).toMatchSnapshot();
  });
});
