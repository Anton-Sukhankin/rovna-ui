import { entries, kebabCase } from '@rovna-ui/utils';

import { StylingConfig } from './types/StylingConfig';
import { Responsive } from '../types/Responsive';
import { isResponsiveObject } from './isResponsiveObject';
import { createMediaQuery } from './createMediaQuery';

const media = {
  xs: 520,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1640,
};
const order = {
  initial: 1,
  xl: 2,
  lg: 3,
  md: 4,
  sm: 5,
  xs: 6,
};

/**
 * Основная функция-стилизатор
 */
export const styling = <K extends string>(stylingConfig: StylingConfig<K>) => {
  return (props: Partial<Record<K, Responsive<string | number | boolean>>>) => {
    const keys = Object.keys(stylingConfig) as K[];
    const result: string[] = [];
    const queries: string[] = [];

    for (const key of keys) {
      const schema = stylingConfig[key];

      switch (schema.type) {
        case 'boolean': {
          const value = props[key] as
            | boolean
            | undefined
            | Responsive<boolean | undefined>;
          if (!value) continue;
          entries(schema.properties)
            .map(([name, value]) => `${kebabCase(name)}: ${value};`)
            .forEach(css => {
              result.push(css);
            });
          break;
        }

        case 'string': {
          for (const property of schema.properties) {
            const value = props[key] as
              | string
              | undefined
              | Responsive<string | undefined>;
            if (typeof value === 'undefined') continue;
            if (isResponsiveObject(value)) {
              entries(value)
                .sort((a, b) => order[a[0]] - order[b[0]])
                .map(([k, v]) => {
                  const name = kebabCase(property);
                  if (k === 'initial') {
                    const css = `${name}: ${v};`;
                    queries.push(css);
                  } else {
                    queries.push(createMediaQuery(media[k], name, v));
                  }
                });
            } else {
              const name = kebabCase(property);
              const css = `${name}: ${value};`;
              result.push(css);
            }
          }
          break;
        }
        case 'string | number': {
          for (const property of schema.properties) {
            const transformer = schema.transform;
            const value = props[key] as
              | string
              | number
              | undefined
              | Responsive<string | number | undefined>;
            if (typeof value === 'undefined') continue;
            if (isResponsiveObject(value)) {
              entries(value)
                .sort((a, b) => order[a[0]] - order[b[0]])
                .map(([k, v]) => {
                  const name = kebabCase(property);
                  const transformed = transformer ? transformer(v) : v;
                  if (k === 'initial') {
                    const css = `${name}: ${transformed};`;
                    queries.push(css);
                  } else {
                    queries.push(createMediaQuery(media[k], name, transformed));
                  }
                });
            } else {
              const _value = value as string | number;
              const name = kebabCase(property);
              const transformed = transformer ? transformer(_value) : _value;
              const css = `${name}: ${transformed};`;
              result.push(css);
            }
          }

          break;
        }

        default:
          break;
      }
    }

    // Сортируем свойства по алфавиту
    result.sort((a, b) => a[0].localeCompare(b[0]));

    return result.concat(queries).join('\n');
  };
};
