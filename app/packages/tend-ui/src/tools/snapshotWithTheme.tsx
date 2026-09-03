import React, { ReactNode } from 'react';
import renderer from 'react-test-renderer';

import { RovnaUI } from '../theme';

export const snapshotWithTheme = (node: ReactNode) => {
  return renderer.create(<RovnaUI>{node}</RovnaUI>);
};
