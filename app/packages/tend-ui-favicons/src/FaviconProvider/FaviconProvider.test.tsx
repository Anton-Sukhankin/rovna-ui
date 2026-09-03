import React from 'react';
import { render } from '@testing-library/react';

import { FaviconProvider } from './FaviconProvider';
import { FaviconType } from '../types';

describe('FaviconProvider', () => {
  it('renders with different types', () => {
    const types: FaviconType[] = [
      'ks-manager-10D',
      'lk-10D',
      'smaterials',
      'materials-10D',
      'pass-10D',
      'pass-gdrs-10D',
      'plan-10D',
      'pro-10D',
      'quality-10D',
      'reports-10D',
      'rmp-10D',
      'sblueprint',
      'sod-10D',
      'tender-10D',
    ];

    types.forEach(type => {
      const { container } = render(<FaviconProvider type={type} />);
      expect(container).toBeInTheDocument();
    });
  });
});
