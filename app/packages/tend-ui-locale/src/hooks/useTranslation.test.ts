import React from 'react';
import renderer from 'react-test-renderer';

import { useTranslation } from './useTranslation';

describe('useTranslation', () => {
  it('returns a message from the default Russian locale', () => {
    const Component = () => {
      const t = useTranslation();

      return React.createElement('span', null, t(['general', 'close']));
    };

    const root = renderer.create(React.createElement(Component)).root;

    expect(root.findByType('span').children).toEqual(['Закрыть']);
  });
});
