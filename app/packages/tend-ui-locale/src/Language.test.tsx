import React from 'react';
import renderer from 'react-test-renderer';

import { useTranslation } from './hooks';
import { en } from './messages/en';
import { ru } from './messages/ru';
import { Language } from './Language';

const collect = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: Record<string, any>,
  parent: string[] = [],
  paths: string[][] = [],
) => {
  const schema = Object.keys(value);

  for (const key of schema) {
    if (typeof value[key] === 'object') {
      collect(value[key], [...parent, key], paths);
    } else {
      paths.push([...parent, key]);
    }
  }

  return paths;
};

describe('Language', () => {
  describe.each(collect(ru))('"ru" locale', (...path) => {
    it(`returns correct message for ${path.join('.')}`, () => {
      const Component = () => {
        const t = useTranslation();

        return <span>{t(path)}</span>;
      };

      const snap = renderer.create(<Component />);
      expect(snap).toMatchSnapshot();
    });
  });

  describe.each(collect(en))('"en" locale', (...path) => {
    it(`returns correct message for ${path.join('.')}`, () => {
      const Component = () => {
        const t = useTranslation();

        return <span>{t(path)}</span>;
      };

      const snap = renderer.create(
        <Language language='en'>
          <Component />
        </Language>,
      );
      expect(snap).toMatchSnapshot();
    });
  });
});
